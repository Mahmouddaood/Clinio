import { takeLatest, put, all } from "redux-saga/effects";
import { FETCH_HISTORY_APPOINTS, FETCH_UPCOMING_APPOINTS } from "./types";
import {
  getHistoryAppointsFinished,
  getUpcomingAppointsFinished
} from "./actions";
import {
  upcomingAppointsData,
  historyAppointsData
} from "../../../utilities/data";

function* getUpcomingAppoints() {
  try {
    let isFirstSignUp = false;
    if (
      !(
        upcomingAppointsData &&
        Array.isArray(upcomingAppointsData) &&
        upcomingAppointsData.length
      )
    ) {
      isFirstSignUp = true;
    }
    return yield put(
      getUpcomingAppointsFinished({
        data: upcomingAppointsData,
        isFirstSignUp
      })
    );
  } catch (error) {
    yield put(
      getUpcomingAppointsFinished({
        err: "Error from server"
      })
    );
  }
}

function* getHistoryAppoints() {
  try {
    return yield put(
      getHistoryAppointsFinished({
        data: historyAppointsData
      })
    );
  } catch (error) {
    yield put(
      getHistoryAppointsFinished({
        err: "Error from server"
      })
    );
  }
}

export default function* appointmentsSaga() {
  yield all([takeLatest(FETCH_UPCOMING_APPOINTS, getUpcomingAppoints)]);
  yield all([takeLatest(FETCH_HISTORY_APPOINTS, getHistoryAppoints)]);
}
