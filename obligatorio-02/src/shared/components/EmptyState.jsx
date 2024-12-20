import React from "react";
import "./styles/EmptyState.css";

function EmptyState({ title, description }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default EmptyState;
