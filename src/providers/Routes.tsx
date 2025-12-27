import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import routes from "../config/routes";
import PublicRoute from "../components/Routers/PublicRoute";
import ProtectedRoute from "../components/Routers/ProtectedRoute";

const Routes = () => {
  const Login = routes.login.component;
  const Home = routes.home.component;
  const Add = routes.AddStudents.component;
  const Page404 = routes.page404.component;
  const TakeAction = routes.takeaction.component;

  return (
    <>
      {useRoutes([
        {
          path: routes.login.path,
          element: <PublicRoute>{<Login />}</PublicRoute>,
        },
        {
          path: routes.home.path,
          element: <ProtectedRoute>{<Home />}</ProtectedRoute>,
        },
        {
          path: routes.AddStudents.path,
          element: <ProtectedRoute roles={["admin"]}>{<Add />}</ProtectedRoute>,
        },
        {
          path: routes.page404.path,
          element: <PublicRoute>{<Page404 />}</PublicRoute>,
        },
        {
          path: routes.takeaction.path,
          element: (
            <ProtectedRoute roles={["admin"]}>{<TakeAction />}</ProtectedRoute>
          ),
        },
      ])}
    </>
  );
};

export default Routes;
