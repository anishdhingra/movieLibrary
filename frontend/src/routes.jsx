import { Route, Routes } from "react-router-dom";
import { Constants } from "./utils/constants";
import Home from "./container/Home";
import Login from "./container/Login";
import MovieDetail from "./container/MovieDetail";
import MyMovieList from "./container/MyMovieList";
import PublicMovieList from "./container/PublicMovieList";
import Register from "./container/Register";
import Welcome from "./container/Welcome";

export const RouteMapping = () => {
  const { ROUTES } = Constants;
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetail />} />
      <Route path={ROUTES.MY_MOVIE_LIST} element={<MyMovieList />} />
      <Route path={ROUTES.PUBLIC_MOVIE_LIST} element={<PublicMovieList />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.WELCOME} element={<Welcome />} />
    </Routes>
  );
};
