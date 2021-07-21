import React from "react";
import styles from "./image.module.css";
import pic from "../../images/img-1.jpg";

const image = (props) => {
  return (
    <div className={styles.Image}>
      <img
        src={`https://image.tmdb.org/t/p/original${props.pic}`}
        alt="image"
        className={styles.Picture}
      ></img>
    </div>
  );
};

export default image;
