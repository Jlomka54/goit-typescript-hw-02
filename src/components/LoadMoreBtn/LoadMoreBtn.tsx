import { FC } from "react";
import css from "./LoadMoreBtn.module.css";
interface LoadMoeProps {
  loadMorePhoto: () => void;
}

const LoadMoreBtn: FC<LoadMoeProps> = ({ loadMorePhoto }) => {
  return (
    <div className={css.container}>
      <button className={css.button} onClick={loadMorePhoto} type="button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
