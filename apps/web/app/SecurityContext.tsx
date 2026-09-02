'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface UserSessionProfile {
  id: string | null;
  username: string | null;
  displayName: string;
  email: string | null;
  role: 'ADMIN' | 'MANAGER' | 'USER' | 'GUEST';
}

interface SecurityContextType {
  activeUserId: string | null;
  userProfile: UserSessionProfile | null;
  loading: boolean;
  theme: 'light' | 'dark';
  loginUser: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  toggleTheme: () => void;
  updateUserProfile: (profile: Partial<UserSessionProfile>) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserSessionProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const router = useRouter();
  const pathname = usePathname();

  // Synchronize localStorage preference and initialize theme matching on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('wolf_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Watch theme changes and apply class to documentElement for Tailwind v4
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('wolf_theme', theme);
  }, [theme]);

  // Background identity check on component initialization
  useEffect(() => {
    const verifyIdentitySession = async () => {
      try {
        // 1. Check if this specific tab has been verified during this tab's active window life
        const tabVerified = sessionStorage.getItem('wolf_tab_session_active');

        // 2. If the tab was closed/restored, clear out old states and force a strict security check
        if (!tabVerified) {
          sessionStorage.clear(); // Wipe out any loose guest allowances
        }

        const response = await fetch('/api/system/auth/me');

        if (response.ok) {
          const profile: UserSessionProfile = await response.json();

          // 3. Strict guard: If the server returned a guest profile but they managed to bypass a route, catch it
          if (profile.role === 'GUEST') {
            throw new Error('Server session expired');
          }

          setActiveUserId(profile.id);
          setUserProfile(profile);

          // 4. Mark this specific tab instance as successfully authenticated
          sessionStorage.setItem('wolf_tab_session_active', 'true');
        } else {
          // Fallback strategy: Assign Guest profile if the network call rejects
          setActiveUserId(null);
          setUserProfile({ id: null, username: null, displayName: 'Anonymous Guest', email: null, role: 'GUEST' });
        }
      } catch (error) {
        // Network failure or security fallback
        setActiveUserId(null);
        setUserProfile({ id: null, username: null, displayName: 'Anonymous Guest', email: null, role: 'GUEST' });
        sessionStorage.removeItem('wolf_tab_session_active');
      } finally {
        setLoading(false);
      }
    };

    verifyIdentitySession();
    /* Clear out pathname from the dependency array to prevent overwriting local state changes on route traversal */
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/system/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const profile: UserSessionProfile = await response.json();
        setActiveUserId(profile.id);
        setUserProfile(profile);
        router.push('/');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      await fetch('/api/system/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout sync error:', error);
    } finally {
      setActiveUserId(null);
      setUserProfile({
        id: null,
        username: null,
        displayName: 'Anonymous Guest',
        email: null,
        role: 'GUEST'
      });
      router.push('/login');
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateUserProfile = (updatedFields: Partial<UserSessionProfile>) => {
    setUserProfile((prev) => {
      if (!prev) return null;
      return { ...prev, ...updatedFields };
    });
  };

  return (
    <SecurityContext.Provider value={{ activeUserId, userProfile, loading, theme, loginUser, logoutUser, toggleTheme, updateUserProfile }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be encapsulated inside a valid SecurityProvider framework');
  }
  return context;
};
