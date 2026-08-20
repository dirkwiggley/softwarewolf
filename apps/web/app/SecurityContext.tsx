'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
  id: string;
  username: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

interface SecurityContextType {
  activeUserId: string;
  setActiveUserId: (id: string) => void;
  userProfile: UserProfile | null;
  loading: boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: ReactNode }) {
  const [activeUserId, setActiveUserId] = useState<string>('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sync the context to check who the active user is whenever the ID changes
    if (!activeUserId) {
      setUserProfile(null);
      return;
    }

    setLoading(true);
    fetch('/api/system/users', { headers: { 'x-mock-user-id': activeUserId } })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((users: UserProfile[]) => {
        // Find the logged-in profile context details out of the directory list
        const activeUser = users.find((u) => u.id === activeUserId);
        setUserProfile(activeUser || null);
      })
      .catch(() => setUserProfile(null))
      .finally(() => setLoading(false));
  }, [activeUserId]);

  return (
    <SecurityContext.Provider value={{ activeUserId, setActiveUserId, userProfile, loading }}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) throw new Error('useSecurity must be used within a SecurityProvider');
  return context;
}
