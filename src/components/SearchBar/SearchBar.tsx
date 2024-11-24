import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FC, FormEvent, useState } from "react";

interface SearchBatProps {
  onSubmit: (value: string) => void;
}

const SearchBar: FC<SearchBatProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (eve: FormEvent<HTMLFormElement>) => {
    eve.preventDefault();

    if (inputValue.trim() === "") {
      toast.error("Please enter value");
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="searchValue"
          type="text"
          placeholder="Search images and photos"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
