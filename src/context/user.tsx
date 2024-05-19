import { Session } from '@supabase/supabase-js';
import { ReactNode, createContext, useContext } from 'react';

export const UserContext = createContext<{
  session: Session | null;
  isLoggedIn: boolean;
}>({
  session: null,
  isLoggedIn: false,
});

export const UserProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => (
  <UserContext.Provider value={{ session, isLoggedIn: Boolean(session) }}>
    {children}
  </UserContext.Provider>
);

export const useUser = () => useContext(UserContext);
