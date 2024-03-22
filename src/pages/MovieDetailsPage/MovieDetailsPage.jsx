import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getTrendingMoviesById } from "../../movies-api";
import { Loader } from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieDetailsPage() {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? "/");

  const { movieId } = useParams();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const data = await getTrendingMoviesById(movieId);
        setDetail(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
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

  const posterSrc =
    detail.poster_path && detail.backdrop_path !== null
      ? `https://image.tmdb.org/t/p/w500/${detail.poster_path}`
      : defaultImg;

  return (
    <div>
      <Link to={backLinkHref.current} className={css.backLinkHref}>
        Go back
      </Link>
      {loading ? (
        <div className={css.loaderContainer}>{loading && <Loader />}</div>
      ) : (
        detail && (
          <div className={css.block}>
            <Link to={`/movies/${movieId}`}>
              <img src={posterSrc} width={250} alt="poster" />
            </Link>
            <div className={css.content}>
              <div className={css.description}>
                <p className={css.title}>{detail.original_title}</p>
                {releaseYear && <p className={css.date}>({releaseYear})</p>}
                {userScore && (
                  <p>
                    <span className={css.span}>User Score:</span> {userScore}%
                  </p>
                )}
              </div>

              <p className={css.overview}>
                <span className={css.span}> Overview: </span>
                {detail.overview}
              </p>
            </div>
          </div>
        )
      )}
      {error && <ErrorMessage />}
      <div className={css.subblock}>
        <h2 className={css.information}>Additional Information</h2>
        <ul className={css.list}>
          <li>
            <NavLink to="cast" className={css.link}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={css.link}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
