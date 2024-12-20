import React from "react";

function Event({ event, onAddToFavorites, onDiscard }) {
  return (
    <div className="eventContainer">
      <div className="imageWrapper">
        <img
          src={event.images?.[0]?.url || "https://via.placeholder.com/150"}
          alt={event.name}
        />
        <div className="eventDate">
          {new Date(event.dates.start.localDate).toLocaleDateString()}
        </div>
        <div className="eventData">
          <h4 className="eventCategory">
            {event.classifications?.[0]?.segment?.name ||
              "Categoría desconocida"}
          </h4>
          <h3 className="eventTitle">{event.name}</h3>
        </div>
      </div>
      <div className="eventInfo">
        <div className="actions">
          <button onClick={() => onDiscard()}>No me interesa</button>
          <button onClick={() => onAddToFavorites(event)}>Me interesa</button>
        </div>
      </div>
    </div>
  );
}

export default Event;
