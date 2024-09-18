import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Forms from "../pages/forms/Forms";
import NewForm from "../pages/newForm/NewForm";

const Router = () => {
  const routes = [
    { path: "/", component: <Home /> },
    { path: "/login", component: <Login /> },
    { path: "/forms", component: <Forms /> },
    { path: "/forms/new", component: <NewForm /> },
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
