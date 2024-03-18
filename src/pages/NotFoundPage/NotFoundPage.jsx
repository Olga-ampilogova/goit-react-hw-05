import { Link } from "react-router-dom";
import css from "./NotfoundPage.module.css";
export default function NotFoundPage() {
  return (
    <div>
      <b>Sorry, the page is not found!</b>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
