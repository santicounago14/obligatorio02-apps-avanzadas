import React from "react";
import { useQuery } from "@tanstack/react-query";
import useEventStore from "../../store/useEventStore";
import Event from "../event/Event";
import { baseURL, apiKey } from "../../helpers/constants";

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
