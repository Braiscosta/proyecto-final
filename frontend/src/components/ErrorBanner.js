import { useContext } from "react";
import { ErrorContext } from "./error";
import "./error.css";

export default function ErrorBanner() {
  const [error, setError] = useContext(ErrorContext);

  return (
    <>
      {error ? (
        <div className="modal-container">
          <div className="modal">
            <h1>Ha ocurrido un error:</h1>
            <p>{error}</p>
            <button className="modal-button" onClick={() => setError(null)}>
              ok!
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
