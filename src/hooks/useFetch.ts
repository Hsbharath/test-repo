import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

interface UseFetchOptions<T> {
  URL?: string;
  initialData: T;
}

interface UseFetchResult<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
  setData: Dispatch<SetStateAction<T>>;
}

function useFetch<T>({ URL, initialData }: UseFetchOptions<T>): UseFetchResult<T> {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (!URL) {
      setData(initialData);
      setIsLoading(false);
      setError(null);
      return;
    };

    setIsLoading(true);
    setError(null);
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Network Error - ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        if(err instanceof Error && err.name !== 'AbortError'){
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // return () => controller.abort();
  }, [ URL] );

  return { data, isLoading, error, setData };

};

export default useFetch;
