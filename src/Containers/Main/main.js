import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Image from "../../Components/Image/image";
import styles from "./main.module.css";
import Button from "../../Components/Button/button";
import MoviePoster from "../../Components/MoviePoster/moviePoster";
import MovieModel from "../../Components/ImageFooter/footer";
import * as actions from "../../Store/index";

class Main extends Component {
  state = {
    trendingMovies: [],
    currentMovieIndex: 0,
  };

  componentDidMount() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=08c2f55b292be9f9e5c4ee8cf6a80fd6&language=en-US&page=1"
      )
      .then((res) => {
        console.log(res.data.results);
        this.setState({
          trendingMovies: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  }

  nextMovieHandler = () => {
    let current = this.state.currentMovieIndex;
    if (current === this.state.trendingMovies.length - 1) {
      current = -1;
    }
    this.setState({ currentMovieIndex: current + 1 });
  };

  prevMovieHandler = () => {
    let current = this.state.currentMovieIndex;
    if (current !== 0) {
      this.setState({ currentMovieIndex: current - 1 });
    }
  };

  render() {
    let movie = this.state.trendingMovies[this.state.currentMovieIndex];
    console.log(window.innerWidth);

    return (
      <div className={styles.Main}>
        <div className={styles.Upcoming}>Upcoming Movies</div>
        <MoviePoster
          movie={movie}
          nextClick={this.nextMovieHandler}
          prevClick={this.prevMovieHandler}
          movieIndex={this.state.currentMovieIndex}
        />
        <div className={styles.Trending}>Trending Movies</div>
        <div className={styles.TopMovies}>
          {this.props.currentMovies?.map((item, index) => (
            <MovieModel
              key={index.toString()}
              movie={item}
              movieDetail={this.props.onMovieDetail}
              watchlistItem={this.props.onWatchDetail}
              watchlist={this.props.watchlist}
            />
          ))}
          <div className={styles.Button}>
            <Button
              icon="chevron left icon"
              click={this.props.prev}
              disable={this.props.currentPage === 1}
            />
            <Button icon="chevron right icon" click={this.props.next} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.searchData,
  movieData: state.movieDetail,
  watchlist: state.watchlist,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchWatchlist: () => dispatch(actions.fetchWatchlist()),
    onSearch: (title) => dispatch(actions.search(title)),
    onWatchlist: (data) => dispatch(actions.watchlist(data)),
    onMovieDetail: (data) => dispatch(actions.movieDetail(data)),
    onWatchDetail: (data) => dispatch(actions.watchDetail(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

// https://image.tmdb.org/t/p/w300/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg
