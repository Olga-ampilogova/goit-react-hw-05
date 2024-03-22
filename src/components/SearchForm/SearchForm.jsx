import { Field, Formik, Form } from "formik";
import { Link, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchForm.module.css";

export default function SearchForm({ onSearch }) {
  const notify = () => toast.error("Please, enter the searchword!");
  const location = useLocation();
  return (
    <div>
      <Link to={location.state?.from ?? "/"} state={{ from: location }}></Link>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values, actions) => {
            onSearch(values.search);
            actions.resetForm();
            if (values.search.length == 0) {
              notify();
            } else {
              onSearch(values.search);
              actions.resetForm();
            }
          }}
        >
          <Form>
            <div className={css.searchContainer}>
              <Field
                name="search"
                autoComplete="off"
                autoFocus
                placeholder="Search movie"
                className={css.searchInput}
              />
              <button type="submit" className={css.button}>
                Search
              </button>
            </div>

            <div>
              <Toaster position="top-right" reverseOrder={false} />
            </div>
          </Form>
        </Formik>
      </header>
    </div>
  );
}
