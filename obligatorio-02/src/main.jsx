import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import Onboarding from "./components/onboarding/Onboarding"; // Asegúrate de tener el componente Onboarding

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* Ruta de Onboarding */}
          <Route path="/" element={<Onboarding />} />

          {/* Ruta de la aplicación principal */}
          <Route path="/home" element={<App />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
