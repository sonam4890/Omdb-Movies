import React from "react";
import styles from "./pagination.module.css";

const pagination = (props) => {
  let movies = Number(props.currentPage * props.moviePerPage);

  return (
    <div className={styles.Head}>
      <span>
        {movies + 1 - props.moviePerPage} - {movies} of {props.total}
      </span>
      <i className="angle left icon" onClick={props.prev}></i>
      <i className="angle right icon" onClick={props.next}></i>
    </div>
  );
};

export default pagination;
