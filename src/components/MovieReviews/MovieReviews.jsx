import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReview } from "../../movies-api";
import { Loader } from "../Loader/Loader";
import css from "./MovieReviews.module.css";
import { ErrorMessage } from "../ErrorMessageReview/ErrorMessage";

export default function MovieReviews() {
  const [reviews, setReview] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    async function getData() {
      setLoading(true);
      try {
        const data = await getMovieReview(movieId);
        if (data && data.results) {
          setReview(data.results);
        } else {
          console.error("Unexpected data format:", data);
          setReview([]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [movieId]);
  return (
    <>
      <div>
        {!loading && reviews.length > 0 ? (
          reviews.map((review) => (
            <ul key={review.id} className={css.list}>
              <li>
                {review.author_details && review.author_details.avatar_path && (
                  <img
                    className={css.image}
                    src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                    alt={review.author_details.username}
                  />
                )}
                <p className={css.title}>
                  <span className={css.span}>Author:</span> {review.author}
                </p>
                <p className={css.content}>{review.content}</p>
                <p className={css.title}>
                  <span className={css.span}>Rating: </span>
                  {review.author_details.rating}
                </p>
              </li>
            </ul>
          ))
        ) : loading ? (
          <div className={css.loaderContainer}>{loading && <Loader />}</div>
        ) : (
          <p className={css.errorMessage}>There are no reviews available</p>
        )}
      </div>
      {error && <ErrorMessage />}
    </>
  );
}
