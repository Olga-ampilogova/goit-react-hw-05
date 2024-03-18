import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { getTrendingMoviesById } from "../../movies-api";

export default function MovieDetailsPage() {
  const [detail, setDetail] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    async function getData() {
      try {
        const data = await getTrendingMoviesById(movieId);
        setDetail(data);
        // console.log(data);
        // console.log(movieId);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [movieId]);

  let userScore = null;
  if (detail) {
    userScore = Math.round((detail.vote_average / 10) * 100);
  }

  let releaseYear = null;
  if (detail && detail.release_date) {
    const releaseDate = new Date(detail.release_date);
    releaseYear = releaseDate.getFullYear();
  }
  return (
    <div>
      {detail && (
        <div>
          <Link to={`/movies/${movieId}`}>
            <img src={detail.poster_path} alt={detail.original_title} />
          </Link>
          <p>{detail.original_title}</p>
          {releaseYear && <p>({releaseYear})</p>}
          {userScore && <p>User Score: {userScore}%</p>}
          <p>
            Overview: <span>{detail.overview}</span>
          </p>
        </div>
      )}
      <div>
        <h2>Additional Information</h2>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}
