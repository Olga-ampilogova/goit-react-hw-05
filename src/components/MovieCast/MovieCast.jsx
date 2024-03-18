import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../movies-api";

export default function MovieCast() {
  const [credit, setCast] = useState([]);
  const { movieId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    async function getData() {
      try {
        const data = await getMovieCast(movieId);
        if (data && data.cast) {
          setCast(data.cast);
        } else {
          console.error("Unexpected data format:", data);
          setCast([]);
        }
      } catch (error) {
        console.log(error);
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
      <div>{/* <Link to="/movies/:moviId"></Link> */}</div>
      <div>
        {currentItems.map((actor) => (
          <ul key={actor.id}>
            <li>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.original_name}
                />
              )}
              {actor.profile_path && <p>{actor.original_name}</p>}
            </li>
          </ul>
        ))}
      </div>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
// className={styles.pagination}
