import axios from "axios";
import * as actionType from "./actionTypes";

export const fetchDataSuccess = (data) => {
  return {
    type: actionType.FETCH_DATA_SUCCESS,
    data,
  };
};

export const fetchDataFailed = (data) => {
  return {
    type: actionType.FETCH_DATA_FAILED,
    error: data,
  };
};

export const searchStart = (title) => {
  return {
    type: actionType.SEARCH_START,
    title,
  };
};

export const searchSuccess = (data) => {
  return {
    type: actionType.SEARCH_SUCCESS,
    data: data,
  };
};

export const searchFailed = (data) => {
  return {
    type: actionType.SEARCH_FAILED,
    error: data,
  };
};

export const search = (title) => {
  return (dispatch) => {
    dispatch(searchStart(title));
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=08c2f55b292be9f9e5c4ee8cf6a80fd6&language=en-US&query=${title}&page=1&include_adult=false
      `
      )
      .then((res) => {
        console.log(res);
        dispatch(searchSuccess(res.data.results));
      })
      .catch((err) => {
        console.log(err);
        dispatch(searchFailed(err.data));
      });
  };
};

export const showMovieDetail = (data) => {
  return {
    type: actionType.SHOW_MOVIE_DETAIL,
    data,
  };
};

export const movieDetail = (movie) => {
  return (dispatch) => {
    axios
      .get(`http://www.omdbapi.com/?t=${movie.title}&apikey=c74de356`)
      .then((res) => {
        console.log(res);
        dispatch(
          showMovieDetail({
            ...res.data,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const watchDetail = (movie) => {
  return (dispatch) => {
    axios
      .get(`http://www.omdbapi.com/?t=${movie.title}&apikey=c74de356`)
      .then((res) => {
        console.log(res);
        dispatch(
          watchlist({
            ...res.data,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const watchlist = (data) => {
  let watchlist = JSON.parse(sessionStorage.getItem("Watchlist"));
  if (watchlist) {
    watchlist.push(data);
    sessionStorage.setItem("Watchlist", JSON.stringify(watchlist));
  } else {
    watchlist = [data];
    sessionStorage.setItem("Watchlist", JSON.stringify(watchlist));
  }
  console.log(watchlist);
  return {
    type: actionType.ADD_WATCHLIST,
    movie: watchlist,
  };
};

export const fetchWatchlist = () => {
  let watchlist = JSON.parse(sessionStorage.getItem("Watchlist"));
  return {
    type: actionType.FETCH_WATCHLIST,
    list: watchlist,
  };
};

export const deleteMovie = (movie) => {
  let watchlist = JSON.parse(sessionStorage.getItem("Watchlist"));
  let newWatchlist = watchlist.filter((item) => item.Title !== movie.Title);

  sessionStorage.setItem("Watchlist", JSON.stringify(newWatchlist));

  return {
    type: actionType.DELETE_MOVIE,
    watchlist: newWatchlist,
  };
};

// https://api.themoviedb.org/3/trending/movie/week?api_key=08c2f55b292be9f9e5c4ee8cf6a80fd6

// https://api.themoviedb.org/3/search/company?api_key=08c2f55b292be9f9e5c4ee8cf6a80fd6&query=malik&page=1

// https://api.themoviedb.org/3/search/movie?api_key=08c2f55b292be9f9e5c4ee8cf6a80fd6&language=en-US&query=malik&page=1&include_adult=false

// http://www.omdbapi.com/?t=${title}&apikey=c74de356
