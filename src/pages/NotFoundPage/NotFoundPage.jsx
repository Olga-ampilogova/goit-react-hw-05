import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div>
      <b>Sorry, the page is not found!</b>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
