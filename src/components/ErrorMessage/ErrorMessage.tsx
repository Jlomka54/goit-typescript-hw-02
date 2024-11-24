import { FC } from "react";
import css from "./ErrorMessage.module.css";

interface ErrorProps {
  message: string;
}

const ErrorMessage: FC<ErrorProps> = ({ message }) => {
  return (
    <div className={css.error}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
