import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PermisoAcampe from "../pages/forms/PermisoAcampe";
import MainLayout from "../components/layout/MainLayout";

const Router = () => {
  const routes = [
    { path: "/", component: Home },
    { path: "/permiso-acampe", component: PermisoAcampe },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <MainLayout>
                <route.component />
              </MainLayout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
