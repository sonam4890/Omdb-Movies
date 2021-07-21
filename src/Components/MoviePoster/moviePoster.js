import React from "react";
import Image from "../Image/image";
import styles from "./moviePoster.module.css";
import Button from "../Button/button";

const moviePoster = (props) => {
  let style = props.nextClick ? [styles.Button] : [styles.NoButton];
  return (
    <div className={styles.Backdrop}>
      <Image pic={props.movie?.backdrop_path} />
      <div className={styles.Title}>{props.movie?.title}</div>
      <div className={style}>
        <Button
          icon="chevron left icon"
          click={props.prevClick}
          disable={props.movieIndex === 0}
        />
        <Button icon="chevron right icon" click={props.nextClick} />
      </div>
      <div className={styles.Poster}>
        <Image pic={props.movie?.poster_path} />
      </div>
    </div>
  );
};

export default moviePoster;
