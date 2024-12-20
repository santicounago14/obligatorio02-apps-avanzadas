import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
const Toolbar = () => {
  return (
    <>
      <div className="toolbar">
        <NavLink to="/" className="section" activeclassname="active">
          <span className="material-symbols-rounded">add</span>
          <span className="title">Onboarding</span>
        </NavLink>
        <NavLink to="/home" className="section" activeclassname="active">
          <span className="material-symbols-rounded">home</span>
          <span className="title">Inicio</span>
        </NavLink>

        <NavLink to="/favorites" className="section" activeclassname="active">
          <span className="material-symbols-rounded">favorite</span>
          <span className="title">Favoritos</span>
        </NavLink>
        <NavLink to="/settings" className="section" activeclassname="active">
          <span className="material-symbols-rounded">settings</span>
          <span className="title">Configuración</span>
        </NavLink>
      </div>
    </>
  );
};

export default Toolbar;
