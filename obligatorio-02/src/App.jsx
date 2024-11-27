import "./App.css";
import { useState, useEffect } from "react";
import { baseURL, apiKey } from "./helpers/constants";
import { useStoreContador } from "./store/useStoreContador";
import Header from "./components/header/Header";
import SearchBar from "./components/searchBar/SearchBar";
import Toolbar from "./components/toolbar/Toolbar";

function App() {
  const { contador, inc } = useStoreContador();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${baseURL}/events.json?classificationName=Fairs & Festivals&countryCode=US&apikey=${apiKey}&size=50`
    )
      .then((response) => response.json())
      .then((data) => {
        const rawEvents = data._embedded?.events || [];
        console.log(data, "data");

        // Filtrar eventos únicos por nombre y quedarte con la fecha más cercana
        const filteredEvents = Object.values(
          rawEvents.reduce((acc, event) => {
            const key = event.name; // Usar el nombre como clave para identificar duplicados
            const currentDate = new Date(event.dates.start.dateTime);

            if (
              !acc[key] || // Si no existe aún, agregarlo
              currentDate < new Date(acc[key].dates.start.localDate) // Si la nueva fecha es más cercana, reemplazamos
            ) {
              acc[key] = event;
            }

            return acc;
          }, {})
        );

        console.log(filteredEvents, "filteredEvents");

        setEvents(filteredEvents); // Guardar eventos únicos
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="appContent">
      <Header />
      <SearchBar />
      <Toolbar />
    </section>
  );
}

export default App;
