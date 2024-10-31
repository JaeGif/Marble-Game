import React, { useEffect, useState } from 'react';

const API_STRING = import.meta.env.VITE_API_STRING;

function useApi() {
  function post(jsonData, headers, options) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);

    const sendPost = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(API_STRING, {
          method: 'POST',
          body: JSON.stringify(jsonData),
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          ...options,
        });

        const resData = await res.json();
        setData(resData);
      } catch (err) {
        setErr(err);
      }
      setIsLoading(false);
    };
    useEffect(() => {
      sendPost();
    }, []);

    return { data, isLoading, err };
  }

  function get(id, headers, options) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);

    const sendGet = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_STRING}/scores/${id}`, {
          method: 'GET',
          body: JSON.stringify(jsonData),
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          ...options,
        });

        const resData = await res.json();
        setData(resData);
      } catch (err) {
        setErr(err);
      }
      setIsLoading(false);
    };
    useEffect(() => {
      sendGet();
    }, []);

    return { data, isLoading, err };
  }

  function put(jsonData, id, headers, options) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);

    const sendPut = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_STRING}/scores/${id}`, {
          method: 'PUT',
          body: JSON.stringify(jsonData),
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          ...options,
        });

        const resData = await res.json();
        setData(resData);
      } catch (err) {
        setErr(err);
      }
      setIsLoading(false);
    };
    useEffect(() => {
      sendPut();
    }, []);

    return { data, isLoading, err };
  }

  function del(id, headers, options) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);

    const sendDel = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_STRING}/scores/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          ...options,
        });

        const resData = await res.json();
        setData(resData);
      } catch (err) {
        setErr(err);
      }
      setIsLoading(false);
    };
    useEffect(() => {
      sendDel();
    }, []);

    return { data, isLoading, err };
  }

  return [get, post, put, del];
}

export default useApi;
