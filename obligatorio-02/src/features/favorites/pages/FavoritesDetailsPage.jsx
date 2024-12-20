import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useEventsStore from 'shared/store/useEventsStore';

function FavoritesDetailPage() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const {
    favoriteLists,
    removeItemFromList,
    deleteFavoriteList,
    updateFavoriteListTitle
  } = useEventsStore();

  const list = favoriteLists[listId];

  const [newTitle, setNewTitle] = useState(list?.title || '');

  if (!list) {
    return <div>La lista no existe.</div>;
  }

  const handleSaveTitle = () => {
    updateFavoriteListTitle(listId, newTitle);
  };

  const handleDeleteList = () => {
    if (window.confirm(`¿Seguro que desea eliminar la lista "${list.title}"?`)) {
      deleteFavoriteList(listId);
      navigate('/favorites'); // Volver a la lista de listas
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Detalle de la Lista</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input 
          value={newTitle} 
          onChange={e => setNewTitle(e.target.value)} 
          style={{marginRight:'0.5rem'}}
        />
        <button onClick={handleSaveTitle}>Guardar Título</button>
      </div>
      <p>{list.description}</p>
      <p>{list.items.length} evento(s)</p>

      {list.items.length === 0 ? (
        <div>No hay eventos en esta lista.</div>
      ) : (
        <ul style={{ listStyle:'none', padding:0 }}>
          {list.items.map(item => (
            <li key={item.id} style={{border:'1px solid #ccc', margin:'1rem 0', padding:'1rem'}}>
              <span 
                style={{cursor:'pointer', textDecoration:'underline', marginRight:'1rem'}} 
                onClick={() => navigate(`/detail/${item.id}`)}
              >
                {item.name}
              </span>
              <button onClick={() => removeItemFromList(listId, item.id)}>Quitar</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleDeleteList} style={{background:'red', color:'#fff'}}>
        Eliminar Lista
      </button>
    </div>
  );
}

export default FavoritesDetailPage;
