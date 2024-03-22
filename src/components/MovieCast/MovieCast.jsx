import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../movies-api";
import { Loader } from "../Loader/Loader";
import css from "./MovieCast.module.css";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieCast() {
  const [credit, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    if (!movieId) return;
    async function getData() {
      setLoading(true);
      try {
        const data = await getMovieCast(movieId);
        if (data && data.cast) {
          setCast(data.cast);
        } else {
          console.error("Unexpected data format:", data);
          setCast([]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [movieId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = credit.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(credit.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div>
        {currentItems.map((actor) => (
          <ul key={actor.id} className={css.list}>
            <li>
              {actor.profile_path ? (
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.original_name}
                />
              ) : (
                <img
                  src={
                    actor.poster_path
                      ? `[<https://image.tmdb.org/t/p/w500/${actor.poster_path}>](<https://image.tmdb.org/t/p/w500/$%7BmovieData.poster_path%7D>)`
                      : defaultImg
                  }
                  width={250}
                  alt="poster"
                />
              )}
              <div className={css.title}>
                {actor.id && (
                  <p className={css.name}>
                    <span className={css.span}>Name: </span>
                    {actor.original_name}
                  </p>
                )}
                {actor.id && (
                  <p className={css.name}>
                    <span className={css.span}>Character: </span>
                    {actor.character}
                  </p>
                )}
              </div>
            </li>
          </ul>
        ))}
      </div>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          className={css.button}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
          className={css.button}
        >
          Next
        </button>
      </div>
      <div className={css.loaderContainer}>{loading && <Loader />}</div>
      {error && <ErrorMessage />}
    </>
  );
}
