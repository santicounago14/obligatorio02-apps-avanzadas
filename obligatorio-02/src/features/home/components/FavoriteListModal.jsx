import React, { useState } from 'react';

function FavoriteListModal({ isOpen, onClose, favoriteLists, createFavoriteList, addItemToList, event }) {
  const [selectedListId, setSelectedListId] = useState('');
  const [newListName, setNewListName] = useState('');
  const [creatingNew, setCreatingNew] = useState(false);

  if (!isOpen) return null;

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === 'new') {
      setCreatingNew(true);
      setSelectedListId('');
    } else {
      setCreatingNew(false);
      setSelectedListId(value);
    }
  };

  const handleCreateAndAdd = () => {
    let listId = selectedListId;
    if (creatingNew) {
      listId = createFavoriteList(newListName || 'Nueva Lista', '');
    }
    addItemToList(listId, { id: event.id, name: event.name });
    onClose();
  };

  const listEntries = Object.entries(favoriteLists); // [ [id, {title, ...}], ...]

  return (
    <div style={{
      position: 'fixed', top:0, left:0, width:'100%', height:'100%',
      background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center'
    }}>
      <div style={{background:'#fff', padding:'2rem', borderRadius:'8px', width:'300px'}}>
        <h2>Agregar a Favoritos</h2>
        <p>Selecciona una lista existente o crea una nueva.</p>

        <select onChange={handleSelectChange} value={creatingNew ? 'new' : selectedListId}>
          <option value="">Seleccionar lista...</option>
          {listEntries.map(([id, list]) => (
            <option key={id} value={id}>{list.title}</option>
          ))}
          <option value="new">Crear nueva lista</option>
        </select>

        {creatingNew && (
          <div style={{marginTop:'1rem'}}>
            <input
              type="text"
              placeholder="Nombre de la nueva lista"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </div>
        )}

        <div style={{marginTop:'1rem'}}>
          <button onClick={handleCreateAndAdd} disabled={!creatingNew && !selectedListId && !creatingNew}>
            Confirmar
          </button>
          <button onClick={onClose} style={{marginLeft:'1rem'}}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteListModal;
