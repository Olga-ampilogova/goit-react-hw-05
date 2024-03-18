import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReview } from "../../movies-api";

export default function MovieReviews() {
  const [reviews, setReview] = useState([]);
  const { movieId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function getData() {
      try {
        const data = await getMovieReview(movieId);
        console.log(data.results);
        if (data && data.results) {
          setReview(data.results);
        } else {
          console.error("Unexpected data format:", data);
          setReview([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [movieId]);
  return (
    <>
      <div>
        {reviews.map((author) => (
          <ul key={author.id}>
            <li>
              {author.author_details.avatar_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${author.author_details.avatar_path}`}
                  alt={author.autor}
                />
              )}
              <p>Author SWITCH: {author.author.content}</p>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}
