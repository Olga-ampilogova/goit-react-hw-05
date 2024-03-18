import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../movies-api";
//  import MoviesPage from "../MoviesPage/MoviesPage";
import MovieList from "../../components/MovieList/MovieList";
import { Link, useLocation } from "react-router-dom";
//import { Link, useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";

// import TrendingMovies from "./trendingmovies/TrendingMovies";
// import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  // const location = useLocation();
  useEffect(() => {
    async function getData() {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
        // console.log(data.results);
      } catch (error) {
        setError("");
      }
    }
    getData();
  }, []);
  return (
    <>
      {/* <Link to={location.state} state={location}></Link> */}
      <div>
        <p>Trending Movies</p>
        {error && <p> Sorry! Reload the page!</p>}
        <MovieList movies={movies} />
      </div>
    </>
  );
}
