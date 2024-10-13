import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Forms from "../pages/forms/Forms";
import NewForm from "../pages/newForm/NewForm";
import FaForms from "../pages/families/forms/FaForms";
import FaFormsFill from "../pages/families/forms/FaFormsFill";

const Router = () => {
  const routes = [
    { path: "/", component: <Home /> },
    { path: "/ed/login", component: <Login /> },
    { path: "/ed/forms", component: <Forms /> },
    { path: "/ed/forms/new", component: <NewForm /> },
    { path: "/fa/forms", component: <FaForms /> },
    { path: "/fa/forms/fill", component: <FaFormsFill /> },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<MainLayout>{route.component}</MainLayout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
