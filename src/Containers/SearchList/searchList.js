import React, { Component } from "react";
import styles from "./searchList.module.css";
import { connect } from "react-redux";
import Image from "../../Components/Image/image";
import * as actions from "../../Store/index";
import { Link } from "react-router-dom";

export class SearchList extends Component {
  render() {
    let array = this.props.searchList.slice(0, 5);
    let list = null;
    if (array?.length > 0 && this.props.searchModel) {
      list = array.map((item) => (
        <Link
          to="/movie"
          className={styles.Item}
          onClick={() => this.props.onMovieDetail(item)}
        >
          <div className={styles.Poster}>
            <Image pic={item.poster_path} />
          </div>
          <div className={styles.Details}>
            <p className={styles.Title}>{item.title}</p>
            <p>{item.release_date?.split("-")[0]}</p>
          </div>
        </Link>
      ));
    }

    return (
      <div className={styles.SearchList}>
        {list}
        {/* <div className={styles.Footer}>show more results</div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchModel: state.showSearchModel,
    searchList: state.searchData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMovieDetail: (data) => dispatch(actions.movieDetail(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
