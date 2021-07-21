import React from "react";
import styles from "./movie.module.css";
import MoviePoster from "../MoviePoster/moviePoster";

const movie = (props) => {
  let add = ["plus icon", "Add to Watchlist", false];

  props.watchlist?.forEach((item) => {
    if (item.Title === props.movie?.Title) {
      add = ["check icon", "In Watchlist", true];
    }
  });

  const time = (t) => {
    let x = Math.floor(parseInt(t) / 60);
    if (x === 0) return `${parseInt(t) % 60}min`;
    else return `${Math.floor(parseInt(t) / 60)}h ${parseInt(t) % 60}min`;
  };
  return (
    <div className={styles.Movie}>
      <div className={styles.Title}>
        <h1>{props.movie?.Title}</h1>
        <div style={{ padding: "10px 0" }}>
          {props.movie?.Year}
          <span style={{ padding: "0 20px" }}>
            {time(props.movie?.Runtime)}
          </span>
        </div>
      </div>
      <MoviePoster movie={props.movie} />
      <div className={styles.Genre}>
        {props.movie?.Genre?.split(", ").map((el) => (
          <span key={el} className={styles.GenreButton}>
            {el}
          </span>
        ))}
      </div>
      <div className={styles.Plot}>{props.movie?.Plot}</div>
      <div className={styles.Rating}>
        <div className={styles.Rated}>
          IMDb RATING
          <div className={styles.Rate}>
            <div style={{ fontSize: "22px", color: "gold" }}>
              <i className="star icon"></i>
            </div>
            <div>
              <span style={{ fontSize: "18px", color: "rgb(236, 230, 230)" }}>
                {props.movie?.imdbRating}
              </span>
              /10 <br></br>
              {(
                parseInt(props.movie?.imdbVotes?.split(",").join("")) / 1000
              ).toFixed(2)}
              K
            </div>
          </div>
        </div>
        <div className={styles.Rated}>
          YOUR RATING
          <div className={styles.Rate}>
            <div style={{ fontSize: "22px", padding: "8px 0" }}>
              <i className="star outline icon"></i>
            </div>
            <div>
              <span style={{ fontSize: "22px", color: "rgb(236, 230, 230)" }}>
                Rate
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.Team}>
          Director
          <span className={styles.TeamSpan}>{props.movie?.Director}</span>
        </div>
        <div className={styles.Team}>
          Writers
          <span className={styles.TeamSpan}>{props.movie?.Writer} </span>
        </div>
        <div className={styles.Team}>
          Stars <span className={styles.TeamSpan}>{props.movie?.Actors}</span>
        </div>
      </div>
      <div>
        <button
          className={styles.AddButton}
          disabled={add[2]}
          onClick={() => props.watchlistItem(props.movie)}
        >
          <i
            className={add[0]}
            style={{ fontSize: "18px", color: "white" }}
          ></i>
          {add[1]}
        </button>
      </div>
    </div>
  );
};

export default movie;
