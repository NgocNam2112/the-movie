import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../pages/home/Home";
import MovieDetail from "../pages/movie-detail/MovieDetail";

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
      {
        path: "movie/detail/:movieId",
        element: <MovieDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "search",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default routers;
