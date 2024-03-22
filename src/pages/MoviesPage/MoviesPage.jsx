import { useEffect, useState } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import { getSearchMoives } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import css from "./Movies.module.css";

export default function MoviesPage() {
  const [searchResult, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = params.get("query") ?? "";
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    async function getData() {
      setLoading(true);
      setShowNotFoundMessage(false);
      try {
        const data = await getSearchMoives(searchQuery);
        setSearchResults(data);
        setShowNotFoundMessage(data.length == 0);

        setError(false);
      } catch (error) {
        setSearchResults([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [params]);

  const handleSearch = (query) => {
    setParams({ query: query });
  };

  return (
    <>
      <div>
        <SearchForm onSearch={handleSearch} />
      </div>
      {showNotFoundMessage ? (
        <p className={css.errorMessage}>The movie is not found</p>
      ) : (
        <MovieList movies={searchResult} />
      )}
      <div className={css.loaderContainer}>{loading && <Loader />}</div>
      {error && <ErrorMessage />}
    </>
  );
}
