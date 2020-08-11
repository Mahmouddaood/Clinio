import {
  FETCH_HISTORY_APPOINTS,
  FETCH_HISTORY_APPOINTS_FINISHED,
  FETCH_UPCOMING_APPOINTS,
  FETCH_UPCOMING_APPOINTS_FINISHED
} from "./types";

export function getUpcomingAppoints() {
  return {
    type: FETCH_UPCOMING_APPOINTS
  };
}

export function getUpcomingAppointsFinished(newStateValues) {
  return {
    type: FETCH_UPCOMING_APPOINTS_FINISHED,
    newStateValues
  };
}

export function getHistoryAppoints() {
  return {
    type: FETCH_HISTORY_APPOINTS
  };
}

export function getHistoryAppointsFinished(newStateValues) {
  return {
    type: FETCH_HISTORY_APPOINTS_FINISHED,
    newStateValues
  };
}
