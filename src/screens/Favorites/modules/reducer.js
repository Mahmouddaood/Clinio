import { GET_FAV_LIST, GET_FAV_LIST_FINISHED } from "./types";

const initialState = {
  isLoading: false,
  dataList: undefined,
  err: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FAV_LIST:
      return {
        ...state,
        err: undefined,
        isLoading: true
      };
    case GET_FAV_LIST_FINISHED:
      return {
        ...state,
        ...action.newStateValue,
        isLoading: false
      };
    default:
      return state;
  }
}
