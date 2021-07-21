import React from "react";
import styles from "./footer.module.css";
import Image from "../Image/image";
import { Link } from "react-router-dom";

const footer = (props) => {
  let add = ["plus icon", "Add to Watchlist", false];
  props.watchlist?.forEach((item) => {
    if (item.Title === props.movie.title) {
      add = ["check icon", "In Watchlist", true];
    }
  });
  return (
    <div className={styles.Movies}>
      <div className={styles.Poster}>
        <Image pic={props.movie?.poster_path} />
      </div>

      <div className={styles.Rating}>
        <span>
          <i className="star icon" style={{ color: "gold" }}></i>
          {props.movie?.vote_average}
        </span>
        <span>
          <i className="star outline icon"></i>Rate
        </span>
      </div>
      <Link
        to="/movie"
        className={styles.Title}
        onClick={() => props.movieDetail(props.movie)}
      >
        {props.movie?.title}
      </Link>
      <div>
        <button
          className={styles.AddButton}
          onClick={() => props.watchlistItem(props.movie)}
          disabled={add[2]}
        >
          <i className={add[0]}></i>
          {add[1]}
        </button>
      </div>
    </div>
  );
};

export default footer;
