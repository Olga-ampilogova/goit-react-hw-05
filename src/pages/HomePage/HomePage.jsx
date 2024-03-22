import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./Home.module.css";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <>
      <div>
        <p className={css.title}>Trending Movies</p>
        {error && <p> Sorry! Reload the page!</p>}
        <MovieList movies={movies} />
        <div className={css.loaderContainer}>{loading && <Loader />}</div>
      </div>
      {error && <ErrorMessage />}
    </>
  );
}
