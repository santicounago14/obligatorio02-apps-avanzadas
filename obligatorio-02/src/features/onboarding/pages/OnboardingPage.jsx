import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEventsStore from "shared/store/useEventsStore";
import { eventTypes } from "shared/utils/constants";
import { toast } from "react-toastify";
import "../styles/Onboarding.css";

import ChipsContainer from "shared/components/ChipsContainer";
import DatePicker from "shared/components/DatePicker";

function OnboardingPage() {
  const { setFilters } = useEventsStore();
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleEventTypeToggle = (type) => {
    setSelectedEventTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleSave = () => {
    const filters = { eventTypes: selectedEventTypes, startDate, keyword };
    setFilters(filters);

    if (!selectedEventTypes.length && !keyword)
      toast.error(
        "Debe seleccionar al menos un tipo de evento o una palabra clave"
      );
    else if (!startDate) toast.error("Debe seleccionar una fecha de inicio");
    else {
      navigate("/home", { state: { filters } });
    }
  };

  return (
    <div className="onboarding">
      <h2>
        ¡Hola Darío, <br></br> te damos la bienvenida!
      </h2>
      <h3>¿Qué estás buscando hoy?</h3>

      <input
        type="text"
        placeholder="Busca por artista o estadios"
        onChange={(e) => setKeyword(e.target.value)}
      />

      <h4>Tipo de evento</h4>

      <ChipsContainer
        eventTypes={eventTypes}
        selectedEventTypes={selectedEventTypes}
        onToggle={handleEventTypeToggle}
      />

      <h4>Fecha mayor a</h4>
      <DatePicker startDate={startDate} onDateChange={handleDateChange} />

      <button className="save-btn" onClick={handleSave}>
        Buscar
      </button>
    </div>
  );
}

export default OnboardingPage;
