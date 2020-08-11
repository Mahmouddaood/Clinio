import { GET_FAV_LIST, GET_FAV_LIST_FINISHED } from "./types";

export function getFavList() {
  return {
    type: GET_FAV_LIST
  };
}

export function getFavListFinished(newStateValue) {
  return {
    type: GET_FAV_LIST_FINISHED,
    newStateValue
  };
}
