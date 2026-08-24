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
  loginUser: (username: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  toggleTheme: () => void;
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
        const response = await fetch('/api/system/auth/me');
        if (response.ok) {
          const profile: UserSessionProfile = await response.json();
          setActiveUserId(profile.id);
          setUserProfile(profile);
        } else {
          // Fallback strategy: Assign Guest profile if the network call rejects
          setActiveUserId(null);
          setUserProfile({
            id: null,
            username: null,
            displayName: 'Anonymous Guest',
            email: null,
            role: 'GUEST'
          });
        }
      } catch (error) {
        // Network failure fallback
        setActiveUserId(null);
        setUserProfile({
          id: null,
          username: null,
          displayName: 'Anonymous Guest',
          email: null,
          role: 'GUEST'
        });
      } finally {
        setLoading(false);
      }
    };

    verifyIdentitySession();
  }, [pathname]);

  const loginUser = async (username: string) => {
    try {
      const response = await fetch('/api/system/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (response.ok) {
        const profile: UserSessionProfile = await response.json();
        setActiveUserId(profile.id);
        setUserProfile(profile);
        router.push('/home');
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

  return (
    <SecurityContext.Provider value={{ activeUserId, userProfile, loading, theme, loginUser, logoutUser, toggleTheme }}>
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
