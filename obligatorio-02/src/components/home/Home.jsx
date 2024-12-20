import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useEventStore from "../../store/useEventStore"; // Ajusta esta ruta según tu estructura de carpeta
import Event from "../event/Event"; // Suponiendo que tienes un componente Event para mostrar los eventos
import { baseURL, apiKey } from "../../helpers/constants"; // Importa apikey desde helpers/constants.js

function Home() {
  const filters = JSON.parse(localStorage.getItem("filters")) || {
    eventTypes: [],
  };
  const { events, setEvents } = useEventStore(); // Extraemos estados y funciones del store

  const { data, isError, isLoading } = useQuery({
    queryKey: ["events", filters],
    queryFn: async () => {
      if (!filters.eventTypes.length) {
        throw new Error("No filters provided");
      }
      const response = await fetch(
        `${baseURL}/events.json?classificationName=${filters.eventTypes.join(
          ","
        )}&countryCode=US&apikey=${apiKey}&size=50`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      return response.json();
    },
  });

  // Actualiza los eventos solo cuando los datos cambien
  useEffect(() => {
    if (data?._embedded?.events) {
      setEvents(data._embedded.events);
    }
  }, [data, setEvents]); // Solo se ejecuta cuando `data` cambia

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading events</div>;
  }

  return (
    <div className="home">
      <h1>¡Hola, Santiago! ¿Qué estás buscando?</h1>
      <p>Hay {events.length} eventos disponibles</p>
      <input type="text" placeholder="Buscar eventos..." />
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
}

export default Home;
