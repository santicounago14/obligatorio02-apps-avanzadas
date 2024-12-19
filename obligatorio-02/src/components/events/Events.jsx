import React from "react";
import useEventStore from "../store/useEventStore";
import Event from "./Event"; // Importamos el componente Event
import Loader from "./Loader"; // Importamos el loader

function Events() {
  const { events, currentEventIndex, setEvents, addToFavorites, discardEvent } =
    useEventStore();

  const { isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch(
        `${baseURL}/events.json?classificationName=Fairs & Festivals&countryCode=US&apikey=${apiKey}&size=50`
      );
      const data = await response.json();

      const rawEvents = data._embedded?.events || [];

      // Filtrar eventos únicos por nombre y quedarte con la fecha más cercana
      const filteredEvents = Object.values(
        rawEvents.reduce((acc, event) => {
          const key = event.name; // Usar el nombre como clave para identificar duplicados
          const currentDate = new Date(event.dates.start.dateTime);

          if (
            !acc[key] || // Si no existe aún, agregarlo
            currentDate < new Date(acc[key].dates.start.dateTime) // Si la nueva fecha es más cercana, reemplazamos
          ) {
            acc[key] = event;
          }

          return acc;
        }, {})
      );

      // Filtramos los eventos descartados (ignorados y descartados son tratados igual)
      const discardedIds = useEventStore.getState().discarded;
      const newFilteredEvents = filteredEvents.filter(
        (event) => !discardedIds.includes(event.id)
      );

      // Guardamos los eventos en el estado
      setEvents(newFilteredEvents);
      return newFilteredEvents;
    },
  });

  if (isLoading) return <Loader />; // Mostrar el loader mientras se cargan los eventos
  if (isError) return <div>Error al cargar los eventos</div>;

  const currentEvent = events[currentEventIndex];

  return (
    <div>
      {currentEvent ? (
        <Event
          event={currentEvent} // Pasamos el evento actual como prop
          onAddToFavorites={addToFavorites} // Función para agregar a favoritos
          onDiscard={discardEvent} // Función para descartar el evento
        />
      ) : (
        <p>No hay eventos para mostrar.</p>
      )}
    </div>
  );
}

export default Events;
