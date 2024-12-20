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

  const handleDiscard = () => {
    discardItem(event.id);
    navigate("/home");
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
              {dates.start.localDate} {dates.start.localTime}
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
                  {sales.public.startDateTime}
                </div>
                <div className="infoDates">
                  <div className="title">
                    <span className="material-symbols-rounded">
                      calendar_today
                    </span>
                    Hasta
                  </div>
                  {sales.public.endDateTime}
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
                        {p.startDateTime}
                      </div>
                      <div className="infoDates">
                        <div className="title">
                          <span className="material-symbols-rounded">
                            calendar_today
                          </span>
                          Fin
                        </div>
                        {p.endDateTime}
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
          <button className="discard" onClick={handleDiscard}>
            Descartar :(
          </button>
          <button className="add" onClick={handleOpenModal}>
            Guardar :)
          </button>
        </div>
      </div>
      <FavoriteListModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        favoriteLists={favoriteLists}
        createFavoriteList={createFavoriteList}
        addItemToList={addItemToList}
        event={event}
      />
    </div>
  );
}

export default DetailsPage;
