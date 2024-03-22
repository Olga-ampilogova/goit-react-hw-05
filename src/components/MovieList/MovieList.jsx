import { Link, useLocation } from "react-router-dom";
// import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import css from "./MovieList.module.css";
export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.listItem}>
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
