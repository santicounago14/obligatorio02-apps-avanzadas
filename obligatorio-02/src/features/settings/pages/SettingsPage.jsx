import React from 'react';
import useEventsStore from 'shared/store/useEventsStore';
import { toast } from 'react-toastify';

function SettingsPage() {
  const { resetLists, resetDiscarded } = useEventsStore();

  const handleResetLists = () => {
    resetLists();
    toast.success('Todas las listas de favoritos han sido restablecidas.');
  };

  const handleResetDiscarded = () => {
    resetDiscarded();
    toast.success('Todos los elementos descartados han sido restablecidos.');
  };

  return (
    <div>
      <h1>Configuración</h1>
      <button onClick={handleResetLists}>Restablecer Listas de Favoritos</button>
      <button onClick={handleResetDiscarded}>Restablecer Elementos Descartados</button>
    </div>
  );
}

export default SettingsPage;
