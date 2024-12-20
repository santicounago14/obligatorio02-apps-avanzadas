import React from "react";
import "./styles/ErrorState.css";

function ErrorState({ title, description }) {
  return (
    <div className="error-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default ErrorState;
