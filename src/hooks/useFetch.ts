import { useState, useEffect, useCallback } from 'react';

interface FetchType {
  isLoading: boolean,
  isError: boolean,
  data: any
}

type HeaderType = {
  method: "GET" | "POST" | "PUT" | "DELETE",
  headers?: Headers,
  body?: string
}

const defaultHeader: HeaderType = {
  method: "GET",
  headers: new Headers({ 'content-type': 'application/json' }),
}

function useFetch<Type>(url, header: HeaderType = defaultHeader): FetchType {
  const [data, setData] = useState<Type>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, { ...defaultHeader, ...header });
      const data = await response.json();
      setIsLoading(false);
      setData(data);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  }, [url, header]);
  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return { isLoading, isError, data };
};

export default useFetch;