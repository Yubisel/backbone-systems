import { useState, useEffect } from 'react';

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
  headers: new Headers({'content-type': 'application/json'}),
}

// method: 'POST', // *GET, POST, PUT, DELETE, etc.
// mode: 'cors', // no-cors, *cors, same-origin
// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
// credentials: 'same-origin', // include, *same-origin, omit
// headers: {
//   'Content-Type': 'application/json'
//   // 'Content-Type': 'application/x-www-form-urlencoded',
// },
// redirect: 'follow', // manual, *follow, error
// referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// body: JSON.stringify(data) 

function useFetch<Type>(url, header: HeaderType = defaultHeader): FetchType {
  const [data, setData] = useState<Type>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(url, {...defaultHeader, ...header});
      const data = await response.json();
      setIsLoading(false);
      setData(data);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return {isLoading, isError, data};
};

export default useFetch;