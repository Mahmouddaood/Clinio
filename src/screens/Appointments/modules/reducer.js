import {
  FETCH_HISTORY_APPOINTS,
  FETCH_HISTORY_APPOINTS_FINISHED,
  FETCH_UPCOMING_APPOINTS,
  FETCH_UPCOMING_APPOINTS_FINISHED
} from "./types";

const initialState = {
  upcomingValues: {
    isLoading: false,
    data: undefined,
    err: undefined,
    isFirstSignUp: false
  },
  historyValues: {
    isLoading: false,
    data: undefined,
    err: undefined
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_UPCOMING_APPOINTS:
      return {
        ...state,
        upcomingValues: {
          ...state.upcomingValues,
          isLoading: true,
          isFirstSignUp: false,
          err: undefined
        }
      };

    case FETCH_UPCOMING_APPOINTS_FINISHED:
      return {
        ...state,
        upcomingValues: {
          ...state.upcomingValues,
          ...action.newStateValues,
          isLoading: false
        }
      };

    case FETCH_HISTORY_APPOINTS:
      return {
        ...state,
        historyValues: {
          ...state.historyValues,
          isLoading: true,
          err: undefined
        }
      };

    case FETCH_HISTORY_APPOINTS_FINISHED:
      return {
        ...state,
        historyValues: {
          ...state.historyValues,
          ...action.newStateValues,
          isLoading: false
        }
      };

    default:
      return state;
  }
}
