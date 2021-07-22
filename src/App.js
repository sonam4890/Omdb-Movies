import React from "react";
import styles from "./App.module.css";
import { Component } from "react";
import Navbar from "./Components/Navbar/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./Store/index";
import Movie from "./Components/MovieDetail/movie";
import WatchlistModel from "./Containers/WatchlistModel/Model";
import Main from "./Containers/Main/main";
import axios from "axios";

class App extends Component {
  state = {
    topRatedMovies: [],
    currentPage: 1,
    moviesPerPage: 4,
    search: this.props.searchModel,
  };

  componentDidMount() {
    this.props.onFetchWatchlist();
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=08c2f55b292be9f9e5c4ee8cf6a80fd6`
      )
      .then((res) => {
        this.setState({
          topRatedMovies: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  }

  nextPageHandler = () => {
    let totalPage = Math.ceil(
      this.state.topRatedMovies.length / this.state.moviesPerPage
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

  searchModelHandler = () => {
    this.setState({
      search: false,
    });
  };

  render() {
    // if (window.innerWidth <= 750) {
    //   this.setMoviesPerPage();
    // }
    const indexOfLastPost = this.state.currentPage * this.state.moviesPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.moviesPerPage;
    const currentMovies = this.state.topRatedMovies.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    return (
      <div className={styles.App} onClick={this.props.onSearchHandler}>
        <Navbar search={this.props.onSearch} />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Main
                next={this.nextPageHandler}
                prev={this.prevPageHandler}
                currentPage={this.state.currentPage}
                currentMovies={currentMovies}
              />
            )}
          ></Route>
          <Route path="/watchlist" component={WatchlistModel}></Route>
          {this.props.movieData ? (
            <Route
              path="/movie"
              render={() => (
                <Movie
                  movie={this.props.movieData}
                  watchlistItem={this.props.onWatchlist}
                  watchlist={this.props.watchlist}
                />
              )}
            ></Route>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.searchData,
  movieData: state.movieDetail,
  watchlist: state.watchlist,
  searchModel: state.showSearchModel,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchWatchlist: () => dispatch(actions.fetchWatchlist()),
    onSearch: (title) => dispatch(actions.search(title)),
    onSearchHandler: () => dispatch(actions.searchHandler()),
    onWatchlist: (data) => dispatch(actions.watchlist(data)),
    onMovieDetail: (data) => dispatch(actions.movieDetail(data)),
    onWatchDetail: (data) => dispatch(actions.watchDetail(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// https://api.themoviedb.org/3/movie/top_rated?api_key=08c2f55b292be9f9e5c4ee8cf6a80fd6&language=en-US&page=1
