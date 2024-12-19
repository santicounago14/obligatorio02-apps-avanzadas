import React, { useState } from "react";
import useEventStore from "../../store/useEventStore"; // Importamos el store
import "./Onboarding.css"; // Para el estilo de los chips

function Onboarding() {
  const { setFilters } = useEventStore(); // Accedemos al setFilters en el store de Zustand
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [startDate, setStartDate] = useState("");

  // Tipos de eventos
  const eventTypes = [
    "Music",
    "Arts & Theatre",
    "Film",
    "Comedy",
    "Fairs & Festivals",
    "Food & Drink",
    "Ice Shows",
    "Flower & Garden",
    "Fashion",
    "Magic",
  ];

  const handleFilterToggle = (filter) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((item) => item !== filter); // Desmarcar el filtro
      } else {
        return [...prevFilters, filter]; // Marcar el filtro
      }
    });
  };

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleSave = () => {
    // Guardar los filtros y la fecha en el store y en localStorage
    const filters = { eventTypes: selectedFilters, startDate };
    setFilters(filters);
    localStorage.setItem("filters", JSON.stringify(filters)); // Persistir filtros en localStorage
  };

  return (
    <div className="onboarding">
      <h2>Bienvenido, selecciona tus filtros iniciales</h2>

      {/* Chips de selección de tipo de evento */}
      <div className="chips-container">
        {eventTypes.map((type) => (
          <button
            key={type}
            className={`chip ${
              selectedFilters.includes(type) ? "selected" : ""
            }`}
            onClick={() => handleFilterToggle(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Date Picker para la fecha de inicio */}
      <div className="date-picker">
        <label htmlFor="startDate">Selecciona la fecha de inicio:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleDateChange}
        />
      </div>

      {/* Botón de guardar */}
      <button className="save-btn" onClick={handleSave}>
        Guardar filtros
      </button>
    </div>
  );
}

export default Onboarding;
