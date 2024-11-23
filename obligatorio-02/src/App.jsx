import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { baseURL, apiKey } from "./helpers/constants";
import { useStoreContador } from "./store/useStoreContador";

function App() {
  const { contador, inc } = useStoreContador();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${baseURL}/events.json?classificationName=Fairs & Festivals&countryCode=US&apikey=${apiKey}&size=50`
    )
      .then((response) => response.json())
      .then((data) => {
        const rawEvents = data._embedded?.events || [];
        console.log(data, "data");

        // Filtrar eventos únicos por nombre y quedarte con la fecha más cercana
        const filteredEvents = Object.values(
          rawEvents.reduce((acc, event) => {
            const key = event.name; // Usar el nombre como clave para identificar duplicados
            const currentDate = new Date(event.dates.start.dateTime);

            if (
              !acc[key] || // Si no existe aún, agregarlo
              currentDate < new Date(acc[key].dates.start.dateTime) // Si la nueva fecha es más cercana, reemplazar
            ) {
              acc[key] = event;
            }

            return acc;
          }, {})
        );

        console.log(filteredEvents, "filteredEvents");

        setEvents(filteredEvents); // Guardar eventos únicos
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <button onClick={inc}>count is {contador}</button>
      <h1>Events</h1>
      <div className="event-list">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <h2>{event.name}</h2>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.dates.start.dateTime).toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {event._embedded?.venues[0]?.name || "Unknown Venue"}
            </p>
            <a href={event.url} target="_blank" rel="noopener noreferrer">
              Buy Tickets
            </a>
            <div className="images">
              {event.images.slice(0, 3).map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={event.name}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
