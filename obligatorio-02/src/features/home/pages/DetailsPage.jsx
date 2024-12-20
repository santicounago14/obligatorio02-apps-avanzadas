import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { baseURL, apiKey } from 'shared/utils/constants';
import useEventsStore from 'shared/store/useEventsStore';
import ErrorMessage from 'shared/components/ErrorMessage';
import FadeLoader from 'react-spinners/FadeLoader';
import FavoriteListModal from '../components/FavoriteListModal';

async function fetchEventById(id) {
    const url = `${baseURL}/events/${id}.json?apikey=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener el evento.');
    const data = await res.json();
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
        addItemToList
    } = useEventsStore();

    const [modalOpen, setModalOpen] = useState(false);

    const { data: event, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['eventDetail', id],
        queryFn: () => fetchEventById(id),
    });

    useEffect(() => {
        if (isSuccess && event) {
            if (discarded.includes(event.id)) {
                navigate('/home');
            }
        }
    }, [isSuccess, event, discarded, navigate]);

    if (isLoading) return <FadeLoader />;
    if (isError) return <ErrorMessage error={error.message} />;
    if (!event) return <div>No hay datos del evento.</div>;

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
        classifications
    } = event;

    const venue = _embedded?.venues?.[0];
    const segmentName = classifications?.[0]?.segment?.name;

    const handleDiscard = () => {
        discardItem(event.id);
        navigate('/home');
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h1>{name}</h1>

            {images && images[0] && (
                <img
                    src={images[0].url}
                    alt={name}
                    style={{ maxWidth: '300px', display: 'block', marginBottom: '1rem' }}
                />
            )}

            {url && (
                <p>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Comprar Tickets
                    </a>
                </p>
            )}

            {dates && dates.start && (
                <div>
                    <h2>Fechas</h2>
                    <p>
                        <strong>Fecha local:</strong> {dates.start.localDate} {dates.start.localTime}
                    </p>
                    <p>
                        <strong>DateTime UTC:</strong> {dates.start.dateTime}
                    </p>
                    <p>
                        <strong>Zona Horaria:</strong> {dates.timezone}
                    </p>
                    {dates.status?.code && (
                        <p>
                            <strong>Estado de venta:</strong> {dates.status.code}
                        </p>
                    )}
                </div>
            )}

            {sales && (
                <div>
                    <h2>Ventas</h2>
                    {sales.public && (
                        <div>
                            <h3>Público</h3>
                            <p>
                                <strong>Inicio:</strong> {sales.public.startDateTime}
                            </p>
                            <p>
                                <strong>Fin:</strong> {sales.public.endDateTime}
                            </p>
                        </div>
                    )}

                    {sales.presales && sales.presales.length > 0 && (
                        <div>
                            <h3>Preventas</h3>
                            {sales.presales.map((p, idx) => (
                                <div key={idx}>
                                    <p>
                                        <strong>Nombre:</strong> {p.name}
                                    </p>
                                    <p>
                                        <strong>Inicio:</strong> {p.startDateTime}
                                    </p>
                                    <p>
                                        <strong>Fin:</strong> {p.endDateTime}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {info && (
                <div>
                    <h2>Información</h2>
                    <p>{info}</p>
                </div>
            )}

            {pleaseNote && (
                <div>
                    <h2>Nota</h2>
                    <p>{pleaseNote}</p>
                </div>
            )}

            {priceRanges && priceRanges.length > 0 && (
                <div>
                    <h2>Rangos de Precios</h2>
                    {priceRanges.map((pr, idx) => (
                        <div key={idx}>
                            <p>
                                <strong>Tipo:</strong> {pr.type}
                            </p>
                            <p>
                                <strong>Moneda:</strong> {pr.currency}
                            </p>
                            <p>
                                <strong>Mínimo:</strong> {pr.min}
                            </p>
                            <p>
                                <strong>Máximo:</strong> {pr.max}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {venue && (
                <div>
                    <h2>Lugar</h2>
                    <p>
                        <strong>{venue.name}</strong>
                    </p>
                    <p>
                        {venue.city?.name}, {venue.country?.name}
                    </p>
                </div>
            )}

            {segmentName && (
                <p>
                    <strong>Clasificación:</strong> {segmentName}
                </p>
            )}

            <button onClick={handleDiscard} style={{ marginRight: '1rem' }}>
                Descartar
            </button>
            <button onClick={handleOpenModal}>Agregar a Favoritos</button>

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
