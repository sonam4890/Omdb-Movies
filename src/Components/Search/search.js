import React from "react";
import SearchList from "../../Containers/SearchList/searchList";
import styles from "./search.module.css";

const search = (props) => {
  const options = [
    "ALL",
    "Title",
    "Companies",
    "Celebs",
    "Keywords",
    "TV Episodes",
  ];
  return (
    <div className={styles.SearchField}>
      {/* <select
        className={styles.Select}
        onSelect={(e) => {
          props.optionChange(e);
        }}
      >
        {options.map((el) => (
          <option value={el}>
            {el}
          </option>
        ))}
      </select> */}
      <input
        className={styles.SearchInput}
        placeholder="Search IMDB"
        onChange={(e) => props.inputChange(e.target.value)}
      ></input>
      <span className={styles.Icon}>
        <i class="search icon"></i>
      </span>
      <SearchList />
    </div>
  );
};

export default search;
