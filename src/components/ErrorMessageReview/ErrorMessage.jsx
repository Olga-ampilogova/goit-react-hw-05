import css from "./ErrorMessage.module.css";
export const ErrorMessage = () => {
  return <p className={css.errorMessage}>Error! The review is not found</p>;
};
