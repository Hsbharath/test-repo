import { useState,useEffect } from 'react';

const useFetch = ({ URL } ) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!URL) {
      setData([]);
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