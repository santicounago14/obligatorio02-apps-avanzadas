import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEventsStore from "shared/store/useEventsStore";
import Back from "../../../shared/components/back/Back";

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
    return <div>La lista no existe.</div>;
  }

  const handleSaveTitle = () => {
    updateFavoriteListTitle(listId, newTitle);
  };

  const handleDeleteList = () => {
    if (
      window.confirm(`¿Seguro que desea eliminar la lista "${list.title}"?`)
    ) {
      deleteFavoriteList(listId);
      navigate("/favorites"); // Volver a la lista de listas
    }
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
        <button onClick={handleSaveTitle}>Actualizar</button>
      </div>
      <p>{list.description}</p>

      {list.items.length === 0 ? (
        <div>No hay eventos en esta lista.</div>
      ) : (
        <ul className="contenedor">
          <h3>Elementos de la lista</h3>
          {list.items.map((item) => (
            <li key={item.id} className="item">
              <span onClick={() => navigate(`/detail/${item.id}`)}>
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

      <button onClick={handleDeleteList} className="deleteList">
        Eliminar Lista
      </button>
    </div>
  );
}

export default FavoritesDetailPage;
