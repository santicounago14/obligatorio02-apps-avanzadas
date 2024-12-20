import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OnboardingPage from "features/onboarding/pages/OnboardingPage";
import DetailsPage from "features/home/pages/DetailsPage";
import HomePage from "features/home/pages/HomePage";
import FavoritesPage from "features/favorites/pages/FavoritesPage";
import SettingsPage from "features/settings/pages/SettingsPage";
import FavoritesDetailsPage from "features/favorites/pages/FavoritesDetailsPage";
import ToolBarWrapper from "shared/components/ToolBarWrapper";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route element={<ToolBarWrapper />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/favorites/:listId" element={<FavoritesDetailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
