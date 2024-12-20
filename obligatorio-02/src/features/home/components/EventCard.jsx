import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

// la info que necesitamos
function EventCard({ event }) {
  const { name, dates, images, _embedded } = event;
  const venue = _embedded?.venues?.[0];

  return (
    <div className="cardEvent">
      {images && images[0] && (
        <div style={{ position: "relative" }}>
          <img src={images[0].url} alt={name} />
          {dates?.start?.localDate && (
            <div className="dateOverlay">{dates.start.localDate}</div>
          )}
        </div>
      )}
      <h3>
        <Link to={`/detail/${event.id}`}>{name}</Link>
      </h3>

      {venue && (
        <div className="location">
          <span className="material-symbols-rounded">location_on</span>
          {venue.name}, {venue.city?.name}
        </div>
      )}
    </div>
  );
}

export default EventCard;
