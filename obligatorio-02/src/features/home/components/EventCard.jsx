import React from 'react';
import { Link } from 'react-router-dom';

function EventCard({ event }) {
  const { name, dates, images, _embedded } = event;
  const venue = _embedded?.venues?.[0];
  return (
    <div style={{border: '1px solid #ccc', padding: '1rem', margin:'1rem 0'}}>
      <h3>
        <Link to={`/detail/${event.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
          {name}
        </Link>
      </h3>
      {images && images[0] && <img src={images[0].url} alt={name} style={{maxWidth:'200px'}} />}
      <p>Fecha: {dates?.start?.localDate} {dates?.start?.localTime}</p>
      {venue && <p>Lugar: {venue.name}, {venue.city?.name}</p>}
    </div>
  );
}

export default EventCard;
