import { useState, useEffect } from "react";

export default function handleData(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network is not ok");
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setData(json);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
    };

    useEffect(() => {
      fetchData();
    }, [url]);
  

  return { data, isLoading, error, refetch: fetchData };
}
