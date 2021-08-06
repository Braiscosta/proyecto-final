import { useEffect, useState } from "react";

export const useDate = (milliseconds) => {
  const [date, setDate] = useState(new Date().toLocaleString());
  useEffect(() => {
    //efecto
    const interval = setInterval(() => {
      const newDate = new Date().toLocaleString();
      setDate(newDate);
    }, milliseconds);

    // función de limpieza
    return () => {
      localStorage.clear();
      clearInterval(interval);
    };
  }, [milliseconds]); // Lista de variables a monitorizar
  return date;
};
