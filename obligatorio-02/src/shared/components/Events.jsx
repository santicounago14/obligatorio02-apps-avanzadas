import React from "react";
import { useQuery } from "@tanstack/react-query";
import useEventStore from "../store/useEventsStore";
import Event from "./Event";
import { baseURL, apiKey } from "../utils/constants";

function Events() {
  const { events, setEvents, currentEventIndex, addToFavorites, discardEvent } =
    useEventStore();

  const filters = JSON.parse(localStorage.getItem("filters")) || {
    eventTypes: [],
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["events", filters],
    queryFn: async () => {
      if (!filters.eventTypes.length) {
        console.log("Sin filtros");
      }
      const response = await fetch(
        `${baseURL}/events.json?classificationName=${filters.eventTypes.join(
          ","
        )}&countryCode=US&apikey=${apiKey}&size=50`
      );
      if (!response.ok) {
        console.log("error");
      }
      return response.json();
    },
    // si esta ok seteamos los eventos en el storee
    onSuccess: (data) => {
      if (data?._embedded?.events) {
        setEvents(data._embedded.events);
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading events</div>;
  }

  const currentEvent = events[currentEventIndex];

  return (
    <div className="home">
      <h1>¡Hola, Santiago! ¿Qué estás buscando?</h1>
      {currentEvent ? (
        <Event
          event={currentEvent}
          onAddToFavorites={() => addToFavorites(currentEvent)}
          onDiscard={() => discardEvent()}
        />
      ) : (
        <p>No hay más eventos disponibles</p>
      )}
    </div>
  );
}

export default Events;
