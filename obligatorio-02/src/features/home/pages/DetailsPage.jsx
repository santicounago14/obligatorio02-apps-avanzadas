import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { baseURL, apiKey } from "shared/utils/constants";
import useEventsStore from "shared/store/useEventsStore";
import ErrorState from "shared/components/ErrorState";
import EmptyState from "shared/components/EmptyState";
import Loader from "shared/components/Loader";
import FavoriteListModal from "../components/FavoriteListModal";
import Back from "../../../shared/components/back/Back";
import "../styles/Details.css";

async function fetchEventById(id) {
  const url = `${baseURL}/events/${id}.json?apikey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener el evento.");
  const data = await res.json();
  console.log(data, "data evento");
  return data;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes
  const year = String(date.getFullYear()).slice(-2); // Año en formato "aa"

  // le meto un formato a la hora en hh:mm
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const time = `${hours}:${minutes}`;

  return `${day}/${month}/${year} ${time}`; // Fecha y hora en formato dd/mm/aa hh:mm
}

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    discardItem,
    discarded,
    favoriteLists,
    createFavoriteList,
    addItemToList,
  } = useEventsStore();

  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: event,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["eventDetail", id],
    queryFn: () => fetchEventById(id),
  });

  useEffect(() => {
    if (isSuccess && event) {
      if (discarded.includes(event.id)) {
        navigate("/home");
      }
    }
  }, [isSuccess, event, discarded, navigate]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorState error={error.message} />;
  if (!event)
    return (
      <EmptyState
        title="Uppps"
        description="No pudimos encontrar los detalles del evento."
      />
    );

  const {
    name,
    url,
    images,
    sales,
    dates,
    info,
    pleaseNote,
    priceRanges,
    _embedded,
    classifications,
    seatmap,
  } = event;

  const venue = _embedded?.venues?.[0];
  const segmentName = classifications?.[0]?.segment?.name;

  const manageDiscard = () => {
    discardItem(event.id);
    navigate("/home");
  };

  const manageOpenModal = () => {
    setModalOpen(true);
  };

  const manageCloseModal = () => {
    setModalOpen(false);
    navigate("/home");
  };

  return (
    <div>
      <Back title="" subtitle="" backLink="/home" />

      {images && images[0] && (
        <img src={images[0].url} alt={name} className="image-header" />
      )}

      <div className="details-container">
        {segmentName && (
          <section className="tags">
            <div className="tag"> {segmentName}</div>
          </section>
        )}
        <h1>{name}</h1>
        <div className="subInfo">
          {dates && dates.start && (
            <div className="date">
              <span className="material-symbols-rounded">calendar_today</span>
              {formatDate(dates.start.localDate)}{" "}
            </div>
          )}
          <span>|</span>
          {venue && (
            <div className="location">
              <span className="material-symbols-rounded">location_on</span>
              <span>{venue.name},</span>
              {venue.city?.name}
            </div>
          )}
        </div>

        {info && (
          <div>
            <h3 className="subtitle">Sobre el evento</h3>
            <p>{info}</p>
          </div>
        )}

        {sales && (
          <div>
            <span className="subtitleConTag">
              <h3 className="">Venta de entradas</h3>
              <section className="tags">
                <div className="tag"> {dates.status.code}</div>
              </section>
            </span>

            {sales.public && (
              <section className="contenedorDates">
                <div className="infoDates">
                  <div className="title">
                    <span className="material-symbols-rounded">
                      calendar_today
                    </span>
                    Desde
                  </div>
                  {formatDate(sales.public.startDateTime)}
                </div>
                <div className="infoDates">
                  <div className="title">
                    <span className="material-symbols-rounded">
                      calendar_today
                    </span>
                    Hasta
                  </div>
                  {formatDate(sales.public.endDateTime)}
                </div>
              </section>
            )}

            {priceRanges && priceRanges.length > 0 && (
              <div>
                <h3 className="subtitle">Rangos de Precios</h3>
                {priceRanges.map((pr, idx) => (
                  <div key={idx} className="precio">
                    <span className="type">{pr.type}</span>
                    <span className="valor">
                      Entre {pr.currency} {pr.min} y {pr.currency} {pr.max}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {seatmap && (
              <div className="infoSeatmap">
                <h3 className="subtitle">Lugar</h3>
                {venue && (
                  <div>
                    <strong className="nombre">{venue.name}</strong>
                    <p>
                      {venue.city?.name}, {venue.country?.name}
                    </p>
                  </div>
                )}
                <img className="seatmap" src={seatmap.staticUrl} />
              </div>
            )}

            {sales.presales && sales.presales.length > 0 && (
              <div>
                <h3 className="subtitle">Preventas</h3>
                {sales.presales.map((p, idx) => (
                  <div key={idx} className="preventa">
                    <h4>{p.name}</h4>
                    <section className="contenedorDates">
                      <div className="infoDates">
                        <div className="title">
                          <span className="material-symbols-rounded">
                            calendar_today
                          </span>
                          Inicio
                        </div>
                        {formatDate(p.startDateTime)}
                      </div>
                      <div className="infoDates">
                        <div className="title">
                          <span className="material-symbols-rounded">
                            calendar_today
                          </span>
                          Fin
                        </div>
                        {formatDate(p.endDateTime)}
                      </div>
                    </section>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {url && (
          <div className="comprarTickets">
            <a href={url} target="_blank" rel="noopener noreferrer">
              ¡Comprar Tickets!
            </a>
          </div>
        )}

        {pleaseNote && (
          <div>
            <h3 className="subtitle">Advertencia</h3>
            <p>{pleaseNote}</p>
          </div>
        )}

        <div className="actions">
          <button className="discard" onClick={manageDiscard}>
            Descartar :(
          </button>
          <button className="add" onClick={manageOpenModal}>
            Guardar :)
          </button>
        </div>
      </div>
      <FavoriteListModal
        isOpen={modalOpen}
        onClose={manageCloseModal}
        favoriteLists={favoriteLists}
        createFavoriteList={createFavoriteList}
        addItemToList={addItemToList}
        event={event}
      />
    </div>
  );
}

export default DetailsPage;
