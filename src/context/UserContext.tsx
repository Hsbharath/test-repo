import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';

const URL = `https://json-placeholder.mock.beeceptor.com/users`;

export interface User {
  id: number;
  name: string;
  country: string;
  [key: string]: unknown;
}

interface UserContextValue {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`Network Error - ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setUsers(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error instanceof Error ? error.message : String(error));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const contextValue = useMemo(
    () => ({ users, isLoading, error }),
    [users, isLoading, error]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
