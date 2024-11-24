import css from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ loadMorePhoto }) => {
  return (
    <div className={css.container}>
      <button className={css.button} onClick={loadMorePhoto} type="button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
