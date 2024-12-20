import React from "react";
import useEventsStore from "shared/store/useEventsStore";
import { toast } from "react-toastify";
import Back from "../../../shared/components/back/Back";
import "../styles/Settings.css";

function SettingsPage() {
  const { resetLists, resetDiscarded } = useEventsStore();

  const manageResetLists = () => {
    resetLists();
    toast.success("Todas las listas de favoritos han sido restablecidas.");
  };

  const manageResetDiscarded = () => {
    resetDiscarded();
    toast.success("Todos los elementos descartados han sido restablecidos.");
  };

  return (
    <div>
      <Back
        title="Configuración"
        subtitle="Administra los eventos."
        backLink="/home"
      />
      <section className="botones">
        {" "}
        <button onClick={manageResetLists}>
          Restablecer listas de favoritos
        </button>
        <button onClick={manageResetDiscarded}>
          Restablecer elementos descartados
        </button>
      </section>
    </div>
  );
}

export default SettingsPage;
