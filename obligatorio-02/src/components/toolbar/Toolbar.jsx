const Toolbar = () => {
  return (
    <>
      <div className="toolbar">
        <NavLink to="/" className="section" activeclassname="active">
          <span className="material-symbols-rounded">home</span>
          <span className="title">Inicio</span>
        </NavLink>

        <NavLink to="/gastos" className="section" activeclassname="active">
          <span className="material-symbols-rounded">list</span>
          <span className="title">Listas</span>
        </NavLink>

        <NavLink to="/add" className="section middle">
          <span className="material-symbols-rounded">add</span>
        </NavLink>

        <NavLink to="/report" className="section" activeclassname="active">
          <span className="material-symbols-rounded">settings</span>
          <span className="title">Configuración</span>
        </NavLink>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Home gastos={gastos} categorias={categorias} />}
        />
        <Route path="/report" element={<Report gastos={gastos} />} />
        <Route
          path="/add"
          element={
            <Agregar
              guardarGasto={guardarGasto}
              gastos={gastos}
              categorias={categorias}
            />
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Detail
              gastos={gastos}
              editar={editar}
              eliminar={eliminar}
              categorias={categorias}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Edit
              gastos={gastos}
              setGastos={setGastos}
              categorias={categorias}
            />
          }
        />
        <Route
          path="/gastos"
          element={<Gastos gastos={gastos} categorias={categorias} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Toolbar;
