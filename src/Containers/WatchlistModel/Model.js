import React, { Component } from "react";
import styles from "./Model.module.css";
import Watchlist from "../../Components/Watchlist/watchlist";
import { connect } from "react-redux";
import * as actions from "../../Store/index";
import Pagination from "../../Components/Pagination/pagination";
import { Link } from "react-router-dom";

const options = [
  "List Order",
  "Alphabetical",
  "IMDb Rating",
  "Your Rating",
  "Popularity",
  "Runtime",
  "Released Date",
];

class Model extends Component {
  state = {
    currentPage: 1,
    moviesPerPage: 3,
  };

  componentDidMount() {
    this.props.onFetchWatchlist();
  }

  pageHandler = (num) => {
    this.setState({ currentPage: num });
  };

  nextPageHandler = () => {
    let totalPage = Math.ceil(
      this.props.watchlist.length / this.state.moviesPerPage
    );
    this.setState((prevState) => {
      if (prevState.currentPage === totalPage) {
        return {
          currentPage: 1,
        };
      } else {
        return {
          currentPage: prevState.currentPage + 1,
        };
      }
    });
  };

  prevPageHandler = () => {
    this.setState((prevState) => {
      if (prevState.currentPage !== 1) {
        return {
          currentPage: prevState.currentPage - 1,
        };
      }
    });
  };

  render() {
    console.log(this.props.watchlist);
    const totalPages = Math.ceil(
      this.props.watchlist?.length / this.state.moviesPerPage
    );
    const indexOfLastPost = this.state.currentPage * this.state.moviesPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.moviesPerPage;
    const currentMovies = this.props.watchlist?.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let element = (
      <div className={styles.Empty}>
        <h1>Your Watchlist is Empty</h1>
        <Link to="/">Please Add Movies</Link>
      </div>
    );
    if (this.props.watchlist?.length > 0) {
      element = (
        <div>
          <div className={styles.Head}>
            <div>Your Watchlist</div>
            {/* <div className={styles.Edit}> 🖊️ EDIT</div> */}
          </div>
          <div className={styles.Middle}>
            <div>{this.props.watchlist?.length} Title</div>
            <div>
              Sort by:
              <select>
                {options.map((el) => (
                  <option>{el}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.List}>
            {currentMovies?.map((item) => (
              <Watchlist
                key={item.title}
                movie={item}
                deleteMovie={this.props.onDeleteMovie}
              />
            ))}
          </div>
          <Pagination
            total={totalPages}
            currentPage={this.state.currentPage}
            moviePerPage={this.state.moviesPerPage}
            next={this.nextPageHandler}
            prev={this.prevPageHandler}
          />
        </div>
      );
    }

    return <div className={styles.WatchlistModel}>{element}</div>;
  }
}

const mapStateToProps = (state) => ({
  watchlist: state.watchlist,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchWatchlist: () => dispatch(actions.fetchWatchlist()),
    onDeleteMovie: (data) => dispatch(actions.deleteMovie(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Model);
