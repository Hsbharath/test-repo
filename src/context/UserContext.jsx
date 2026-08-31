import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const URL = `https://json-placeholder.mock.beeceptor.com/users`;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
          setError(error.message);
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

export const useUsers = () => useContext(UserContext);
