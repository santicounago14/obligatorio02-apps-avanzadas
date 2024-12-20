import React from "react";
import { useNavigate } from "react-router-dom";
import useEventsStore from "shared/store/useEventsStore";
import Back from "../../../shared/components/back/Back";
import ErrorState from "shared/components/ErrorState";
import EmptyState from "shared/components/EmptyState";
import "../styles/favorites.css";

function FavoritesPage() {
  const { favoriteLists } = useEventsStore();
  const navigate = useNavigate();

  const entries = Object.entries(favoriteLists);

  if (entries.length === 0) {
    return (
      <EmptyState
        title="¡No hay listas creadas!"
        description="Parece que no haz creado ninguna lista aún."
      />
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <Back
        title="Mis listas"
        subtitle="Visualizá tus listas"
        backLink="/home"
      />
      <ul className="contenedorListas">
        {entries.map(([listId, listData]) => {
          const count = listData.items.length;
          const preview = count > 0 ? listData.items[0].name : "Lista vacía";
          console.log(preview);
          return (
            <li key={listId} onClick={() => navigate(`/favorites/${listId}`)}>
              <div className="info">
                <h3>{listData.title}</h3>
                <p>{count} evento(s)</p>
              </div>

              {/*  <p>{preview}</p> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FavoritesPage;
