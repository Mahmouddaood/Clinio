import { takeLatest, put, all } from "redux-saga/effects";
import { GET_FAV_LIST } from "./types";
import { getFavListFinished } from "./actions";
import { favorites } from "../../../utilities/data";

function* requestGetFavList() {
  try {
    return yield put(
      getFavListFinished({
        dataList: favorites
      })
    );
  } catch (error) {
    yield put(
      getFavListFinished({
        err: "Error from server"
      })
    );
  }
}

export default function* favortiesSaga() {
  yield all([takeLatest(GET_FAV_LIST, requestGetFavList)]);
}
