import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useEventsStore from "shared/store/useEventsStore";
import ErrorMessage from "shared/components/ErrorMessage";
import FadeLoader from "react-spinners/FadeLoader";
import EventCard from "../components/EventCard";
import { baseURL, apiKey } from "shared/utils/constants";
import FavoriteListModal from "../components/FavoriteListModal";
import "../styles/Home.css";

async function fetchEvents({ eventTypes, startDate, discarded, favorites }) {
  const classificationName = eventTypes.join(",");
  const countryCode = "US";

  let url = `${baseURL}/events.json?apikey=${apiKey}&size=50&countryCode=${countryCode}`;

  if (classificationName) {
    url += `&classificationName=${encodeURIComponent(classificationName)}`;
  }

  if (startDate) {
    url += `&startDateTime=${startDate}T00:00:00Z`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error fetching events");
  const data = await res.json();
  const events = data._embedded?.events || [];

  const discardedIds = new Set(discarded);
  const favoriteIds = new Set(favorites);

  const result = events
    .filter((event) => !discardedIds.has(event.id))
    .filter((event) => !favoriteIds.has(event.id));
  return result;
}

function HomePage() {
  const {
    events,
    setEvents,
    currentEventIndex,
    discardEvent,
    favoriteLists,
    createFavoriteList,
    addItemToList,
    filters,
    discarded,
    favorites,
  } = useEventsStore();
  const { eventTypes, startDate } = filters;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["events", eventTypes, startDate, discarded, favorites],
    queryFn: () => fetchEvents({ eventTypes, startDate, discarded, favorites }),
    staleTime: 0,
    refetchOnMount: "always",
  });

  useEffect(() => {
    if (isSuccess && data) {
      setEvents(data);
    }
  }, [isSuccess, data, setEvents]);

  if (isLoading) return <FadeLoader />;
  if (isError) return <ErrorMessage error={error.message} />;

  const currentEvent = events[currentEventIndex];
  const totalEvents = events.length;

  const handleDiscard = () => {
    discardEvent();
  };

  const handleFavoriteClick = () => {
    if (!currentEvent) return;
    setSelectedEvent(currentEvent);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <div className="defaultLocation">
        <span className="material-symbols-rounded">location_on</span>
        Canada
      </div>
      <h2>¡Encontramos {totalEvents} eventos cerca de vos!</h2>
      <input
        type="text"
        className="inputBusqueda"
        placeholder="Busca por artista o estadios"
      />
      <div className="filtrosAplicados">
        <b>Filtrando por: </b>
        Music y Festival
      </div>

      {currentEvent ? (
        <div>
          <EventCard event={currentEvent} />
          <div className="actionsEvent">
            <button className="discard" onClick={handleDiscard}>
              Descartar :(
            </button>
            <button className="add" onClick={handleFavoriteClick}>
              Guardar :)
            </button>
          </div>
          <FavoriteListModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            favoriteLists={favoriteLists}
            createFavoriteList={createFavoriteList}
            addItemToList={addItemToList}
            event={selectedEvent}
          />
        </div>
      ) : (
        <p>No hay más eventos para mostrar.</p>
      )}
    </div>
  );
}

export default HomePage;
