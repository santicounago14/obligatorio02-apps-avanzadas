import { create } from "zustand";
import { persist } from "zustand/middleware";

const useEventsStore = create(
  persist(
    (set, get) => ({
      events: [],
      filters: {
        eventTypes: [],
        startDate: "",
      },
      discarded: [],
      favorites: [],
      currentEventIndex: 0,
      favoriteLists: {},

      setEvents: (newEvents) => set({ events: newEvents }),
      setFilters: (filters) => set({ filters }),

      discardEvent: () =>
        set((state) => {
          const eventToDiscard = state.events[state.currentEventIndex];
          const updatedDiscarded = [...state.discarded, eventToDiscard.id];

          const nextIndex = state.currentEventIndex + 1;
          const nextEventIndex =
            nextIndex < state.events.length
              ? nextIndex
              : state.currentEventIndex;

          return {
            discarded: updatedDiscarded,
            currentEventIndex: nextEventIndex,
          };
        }),

      discardItem: (id) => {
        const discarded = get().discarded;
        if (!discarded.includes(id)) {
          set({ discarded: [...discarded, id] });
        }
      },

      resetDiscarded: () => set({ discarded: [] }),

      createFavoriteList: (title, description = "") => {
        const newId = Date.now().toString();
        const favoriteLists = get().favoriteLists;
        const favorites = get().favorites;
        favoriteLists[newId] = { title, description, items: [] };
        set({ favorites: [...favorites, newId] });
        set({ favoriteLists: { ...favoriteLists } });
        return newId;
      },

      addItemToList: (listId, item) => {
        const favoriteLists = get().favoriteLists;
        for (let key in favoriteLists) {
          favoriteLists[key].items = favoriteLists[key].items.filter(
            (i) => i.id !== item.id
          );
        }
        const favorites = get().favorites;
        favoriteLists[listId].items.push(item);
        set({ favorites: [...favorites, item.id] });
        set({ favoriteLists: { ...favoriteLists } });
      },

      removeItemFromList: (listId, itemId) => {
        const favoriteLists = get().favoriteLists;
        favoriteLists[listId].items = favoriteLists[listId].items.filter(
          (i) => i.id !== itemId
        );
        const favorites = get().favorites;
        set({ favorites: [...favorites.filter((id) => id !== itemId)] });
        set({ favoriteLists: { ...favoriteLists } });
      },

      deleteFavoriteList: (listId) => {
        const favoriteLists = get().favoriteLists;

        // Verifica que la lista existe antes de proceder
        const listToDelete = favoriteLists[listId];
        if (!listToDelete) {
          console.error(`La lista con ID ${listId} no existe.`);
          return;
        }

        // Obtiene los IDs de los elementos a eliminar
        const itemsToDelete = listToDelete.items.map((i) => i.id);

        // Elimina la lista
        delete favoriteLists[listId];

        // Actualiza el estado con los favoritos filtrados
        const favorites = get().favorites;
        set({
          favorites: [...favorites.filter((id) => !itemsToDelete.includes(id))],
          favoriteLists: { ...favoriteLists },
        });
      },

      updateFavoriteListTitle: (listId, title) => {
        const favoriteLists = get().favoriteLists;
        if (favoriteLists[listId]) {
          favoriteLists[listId].title = title;
          set({ favoriteLists: { ...favoriteLists } });
        }
      },

      resetLists: () =>
        set({
          discarded: [],
          favorites: [],
          favoriteLists: {},
        }),
    }),
    {
      name: "events-store",
    }
  )
);

export default useEventsStore;
