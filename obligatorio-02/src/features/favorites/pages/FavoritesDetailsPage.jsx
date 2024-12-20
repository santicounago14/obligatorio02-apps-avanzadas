import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEventsStore from "shared/store/useEventsStore";
import Back from "../../../shared/components/back/Back";
import ErrorState from "shared/components/ErrorState";
import EmptyState from "shared/components/EmptyState";

import "../styles/favorites.css";

function FavoritesDetailPage() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const {
    favoriteLists,
    removeItemFromList,
    deleteFavoriteList,
    updateFavoriteListTitle,
  } = useEventsStore();

  const list = favoriteLists[listId];

  const [newTitle, setNewTitle] = useState(list?.title || "");

  if (!list) {
    return <ErrorState error="¡La lista no existe!" />;
  }

  const manageSaveTitle = () => {
    updateFavoriteListTitle(listId, newTitle);
  };

  const manageDeleteList = () => {
    deleteFavoriteList(listId);
    navigate("/favorites"); // se borra la lista y lo mando para favoritos devuelta
  };

  return (
    <div>
      <Back
        title={`Detalle de ${newTitle}`}
        subtitle={`${list.items.length} eventos`}
        backLink="/home"
      />
      <div className="changeName">
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <button onClick={manageSaveTitle}>Actualizar</button>
      </div>
      <p>{list.description}</p>

      {list.items.length === 0 ? (
        <EmptyState
          title="¡No hay eventos por acá!"
          description="Parece que no hay eventos en esta lista. Intenta agregando eventos."
        />
      ) : (
        <ul className="contenedor">
          <h3>Elementos de la lista</h3>
          {list.items.map((item) => (
            <li key={item.id} className="item">
              <span
                onClick={() =>
                  navigate(`/detail/${item.id}`, {
                    state: { fromFavorites: true },
                  })
                }
              >
                {item.name}
              </span>
              <span
                className="material-symbols-rounded icono"
                onClick={() => removeItemFromList(listId, item.id)}
              >
                close
              </span>
            </li>
          ))}
        </ul>
      )}

      <button onClick={manageDeleteList} className="deleteList">
        Eliminar Lista
      </button>
    </div>
  );
}

export default FavoritesDetailPage;
