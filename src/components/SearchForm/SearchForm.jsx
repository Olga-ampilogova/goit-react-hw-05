import { Field, Formik, Form } from "formik";
//import { Link, useLocation } from "react-router-dom";
// import { Form } from "react-router-dom";

export default function SearchForm({ onSearch }) {
  // const location = useLocation();
  return (
    <div>
      {/* <Link to={location.state} state={location}>
        Go back
      </Link> */}
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values, actions) => {
            onSearch(values.search);
            actions.resetForm();
            // if (values.search.length == 0) {
            //   // notify();
            // } else if (values.search.length == 1) {
            //   // required();
            // } else {
            //   onSearch(values.search);
            //   actions.resetForm();
            // }
          }}
        >
          <Form>
            <Field
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search movie"
            />
            <button type="submit">Search</button>
          </Form>
        </Formik>
      </header>
    </div>
  );
}
