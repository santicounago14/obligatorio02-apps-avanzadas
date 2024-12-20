import React from 'react';
import { useNavigate } from 'react-router-dom';
import useEventsStore from 'shared/store/useEventsStore';

function FavoritesPage() {
  const { favoriteLists } = useEventsStore();
  const navigate = useNavigate();

  const entries = Object.entries(favoriteLists); 

  if (entries.length === 0) {
    return <div>No hay listas de favoritos creadas.</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Mis Listas de Favoritos</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {entries.map(([listId, listData]) => {
          const count = listData.items.length;
          const preview = count > 0 ? listData.items[0].name : 'Lista vacía';
          return (
            <li key={listId} style={{border:'1px solid #ccc', margin:'1rem 0', padding:'1rem', cursor:'pointer'}}
                onClick={() => navigate(`/favorites/${listId}`)}>
              <h3>{listData.title}</h3>
              <p>{count} evento(s)</p>
              <p>Preview: {preview}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FavoritesPage;
