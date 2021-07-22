import React from "react";
import Image from "../Image/image";
import styles from "./watchlist.module.css";

const watchlist = (props) => {
  return (
    <div className={styles.Watchlist}>
      <div className={styles.Poster}>
        <Image pic={props.movie?.poster_path} />
      </div>
      <div className={styles.Detail}>
        <div className={styles.Title}>{props.movie?.Title}</div>
        <div className={styles.Year}>
          {props.movie?.Year} | {props.movie?.Type} | {props.movie?.Genre}
        </div>
        <div className={styles.Rating}>
          <span>
            <i className="star icon" style={{ color: "gold" }}></i>
            {props.movie?.imdbRating !== "N/A"
              ? props.movie?.imdbRating
              : props.movie?.Ratings[0]?.Value}
          </span>
          {/* <span>
            <i className="star outline icon"></i>Rate
          </span> */}
        </div>
        <div className={styles.Actors}>{props.movie?.Actors}</div>
        <div>{props.movie?.Plot}</div>
        <div
          className={styles.Delete}
          onClick={() => props.deleteMovie(props.movie)}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default watchlist;
