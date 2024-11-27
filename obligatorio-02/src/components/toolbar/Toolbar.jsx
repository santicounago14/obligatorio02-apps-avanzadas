import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
const Toolbar = () => {
  return (
    <>
      <div className="toolbar">
        <NavLink to="/" className="section" activeclassname="active">
          <span className="material-symbols-rounded">home</span>
          <span className="title">Inicio</span>
        </NavLink>

        <NavLink to="/lists" className="section" activeclassname="active">
          <span className="material-symbols-rounded">list</span>
          <span className="title">Listas</span>
        </NavLink>
        {/* <NavLink to="/settings" className="section" activeclassname="active">
          <span className="material-symbols-rounded">settings</span>
          <span className="title">Configuración</span>
        </NavLink> */}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<Home />} />

        {/* <Route
          path="/detail/:id"
          element={
            <Detail
              gastos={gastos}
              editar={editar}
              eliminar={eliminar}
              categorias={categorias}
            />
          }
        /> */}
        {/* <Route
          path="/edit/:id"
          element={
            <Edit
              gastos={gastos}
              setGastos={setGastos}
              categorias={categorias}
            />
          }
        /> */}
        {/* <Route
          path="/gastos"
          element={<Gastos gastos={gastos} categorias={categorias} />}
        /> */}
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default Toolbar;
