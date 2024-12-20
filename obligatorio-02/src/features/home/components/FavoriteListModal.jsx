import React, { useState } from "react";
import "../styles/Modal.css";

function FavoriteListModal({
  isOpen,
  onClose,
  favoriteLists,
  createFavoriteList,
  addItemToList,
  event,
}) {
  const [selectedListId, setSelectedListId] = useState("");
  const [newListName, setNewListName] = useState("");
  const [creatingNew, setCreatingNew] = useState(false);

  if (!isOpen) return null;

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "new") {
      setCreatingNew(true);
      setSelectedListId("");
    } else {
      setCreatingNew(false);
      setSelectedListId(value);
    }
  };

  const handleCreateAndAdd = () => {
    let listId = selectedListId;
    if (creatingNew) {
      listId = createFavoriteList(newListName || "Nueva Lista", "");
    }
    addItemToList(listId, { id: event.id, name: event.name });
    onClose();
  };

  const listEntries = Object.entries(favoriteLists); // [ [id, {title, ...}], ...]

  return (
    <div className="background">
      <div className="modal">
        <h2>Agregar a Favoritos</h2>
        <p>Selecciona una lista o crea una.</p>

        <select
          onChange={handleSelectChange}
          value={creatingNew ? "new" : selectedListId}
        >
          <option value="">Seleccionar lista...</option>
          {listEntries.map(([id, list]) => (
            <option key={id} value={id}>
              {list.title}
            </option>
          ))}
          <option value="new">Crear nueva lista</option>
        </select>

        {creatingNew && (
          <div style={{ marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="Nombre de la nueva lista"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </div>
        )}

        <div className="actionsModal">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="confirm"
            onClick={handleCreateAndAdd}
            disabled={!creatingNew && !selectedListId && !creatingNew}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteListModal;
