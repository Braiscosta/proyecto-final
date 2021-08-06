import { useEffect, useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const initialValue = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : defaultValue;

  const [data, setData] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);
  return [data, setData];
};
