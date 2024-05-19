import { Session } from '@supabase/supabase-js';
import { ReactNode, useEffect, useState } from 'react';
import { client } from '../db/client';
import { router } from 'expo-router';
import { Navbar } from './navbar';
import { SafeAreaView } from 'react-native';
import { UserProvider } from '../context/user';

export const Page = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    setIsLoading(false);

    if (session) {
      router.replace('/listado-usuarios');
    } else {
      router.replace('/');
    }
  }, [session, setIsLoading]);

  return (
    <SafeAreaView>
      <UserProvider session={session}>
        <Navbar />
        {children}
      </UserProvider>
    </SafeAreaView>
  );
};
