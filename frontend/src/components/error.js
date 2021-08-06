import React, { createContext, useState } from "react";

const ErrorContext = createContext();
const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  return (
    <ErrorContext.Provider value={[error, setError]}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext, ErrorProvider };
