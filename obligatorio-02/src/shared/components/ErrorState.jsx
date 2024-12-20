import React from "react";
import "./styles/ErrorState.css"; // Asegúrate de tener un archivo de estilo

function ErrorState({ title, description }) {
  return (
    <div className="error-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default ErrorState;
