import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, testSupabaseConnection } from '@/supabaseClient';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Test Supabase connection first
    testSupabaseConnection().then((result) => {
      console.log('Supabase connection test result:', result);
    });

    // Get initial session
    console.log('Getting initial session...');
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', { session: session ? 'exists' : 'null' });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', { event, session: session ? 'exists' : 'null' });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    console.log('Starting signOut process...');
    try {
      console.log('Calling supabase.auth.signOut()...');
      const { error } = await supabase.auth.signOut();
      console.log('Supabase signOut result:', { error });
      
      if (error) {
        console.error('SignOut error:', error);
      } else {
        console.log('Supabase signOut successful');
      }
      
      // Clear any localStorage data that might interfere
      console.log('Clearing localStorage...');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userPoints');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userItems');
      console.log('localStorage cleared');
      
      // Force state update
      setUser(null);
      setSession(null);
      console.log('Auth state cleared');
      
    } catch (error) {
      console.error('SignOut error:', error);
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 