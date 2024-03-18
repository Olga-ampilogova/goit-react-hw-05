import { Link } from "react-router-dom";
// import MoviesPage from "../../pages/MoviesPage/MoviesPage";

export default function MovieList({ movies }) {
  // const location = useLocation();
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
}
