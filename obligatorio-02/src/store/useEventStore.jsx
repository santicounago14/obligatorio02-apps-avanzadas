import { create } from "zustand";
import { persist } from "zustand/middleware";

const useEventStore = create(
  persist(
    (set) => ({
      events: [],
      filters: {
        eventTypes: [], // Almacenar los filtros de tipo de evento
        startDate: "", // Almacenar la fecha de inicio
      },
      favorites: [],
      discarded: [],
      currentEventIndex: 0,

      setEvents: (newEvents) => set({ events: newEvents }),

      // Función para establecer los filtros
      setFilters: (filters) => set({ filters }),

      // Función para agregar un evento a favoritos
      addToFavorites: (event) =>
        set((state) => {
          // Asegurarse de que no se salga del rango de eventos
          const nextIndex = state.currentEventIndex + 1;
          const nextEventIndex =
            nextIndex < state.events.length
              ? nextIndex
              : state.currentEventIndex;

          return {
            favorites: [...state.favorites, event], // Agregar el evento a favoritos
            currentEventIndex: nextEventIndex, // Avanzar al siguiente evento
          };
        }),

      // Función para descartar un evento
      discardEvent: () =>
        set((state) => {
          const eventToDiscard = state.events[state.currentEventIndex];
          const updatedDiscarded = [...state.discarded, eventToDiscard.id];

          // Asegurarse de que no se salga del rango de eventos
          const nextIndex = state.currentEventIndex + 1;
          const nextEventIndex =
            nextIndex < state.events.length
              ? nextIndex
              : state.currentEventIndex;

          return {
            discarded: updatedDiscarded, // Guardar el evento descartado
            currentEventIndex: nextEventIndex, // Avanzar al siguiente evento
          };
        }),

      resetLists: () => set({ favorites: [], discarded: [] }),
    }),
    {
      name: "event-storage", // Guardar en localStorage
    }
  )
);

export default useEventStore;
