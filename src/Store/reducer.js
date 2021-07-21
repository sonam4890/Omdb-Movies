import * as actionType from "./actionTypes";

const initialState = {
  title: "",
  searchData: [],
  movieDetail: null,
  watchlist: null,
  showSearchModel: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SEARCH_START:
      let model = action.title !== "" ? true : false;
      return { ...state, title: action.title, showSearchModel: model };
    case actionType.SEARCH_SUCCESS:
      return {
        ...state,
        searchData: action.data,
      };
    case actionType.SEARCH_FAILED:
      return { ...state, error: action.error, showSearchModel: false };
    case actionType.SHOW_MOVIE_DETAIL:
      return {
        ...state,
        showSearchModel: false,
        movieDetail: action.data,
      };
    case actionType.ADD_WATCHLIST:
      return {
        ...state,
        watchlist: action.movie,
      };
    case actionType.FETCH_WATCHLIST:
      return {
        ...state,
        watchlist: action.list,
      };
    case actionType.DELETE_MOVIE:
      return {
        ...state,
        watchlist: action.watchlist,
      };
    default:
      return { ...state };
  }
};

export default reducer;
