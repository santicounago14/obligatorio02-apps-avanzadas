import "./App.css";
import { Routes, Route } from "react-router-dom";
import Onboarding from "./components/onboarding/Onboarding";
import Events from "./components/events/Events"; // Asegúrate de que tienes un componente Home para mostrar los eventos
import useEventStore from "./store/useEventStore";

function App() {
  const filters = JSON.parse(localStorage.getItem("filters"));

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={filters ? <Events /> : <Onboarding />} />
        <Route path="/home" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
