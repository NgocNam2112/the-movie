import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../pages/home";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "?page=:pageId",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "movies/:type",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      // {
      //   path: "details/:movieId",
      //   element: <Detail />,
      //   errorElement: <ErrorPage />,
      // },
    ],
  },
]);

export default routers;
