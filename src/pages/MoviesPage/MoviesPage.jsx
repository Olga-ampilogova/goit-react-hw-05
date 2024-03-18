//import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import { getSearchMoives } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [searchResult, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = params.get("query") ?? "";
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    async function getData() {
      try {
        const data = await getSearchMoives(searchQuery);
        setSearchResults(data);
        setError("");
      } catch (error) {
        setSearchResults([]);
        setError("Error searching movies. Please try again.");
      }
    }
    getData();
  }, [params]);

  const handleSearch = (query) => {
    setParams({ query: query });
  };

  return (
    <>
      {/* <div>
        <Link to={location.state} state={location}></Link>
      </div> */}
      <div>
        <SearchForm onSearch={handleSearch} />
      </div>
      {error && <p>{error}</p>}
      <MovieList movies={searchResult} />
    </>
  );
}
