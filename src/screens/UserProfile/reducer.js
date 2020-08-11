import {
  ON_DELETE_USER,
  ON_DELETE_USER_FINISHED,
  ON_LOG_OUT,
  ON_LOG_OUT_FINISHED,
  TOGGLE_DELETE_ACCOUNT,
  ON_CHANGE_PROFILE_DATA,
  SET_PROFILE_DATA,
  GET_PROFILE_DATA,
  GET_PROFILE_FAILED
} from "./types";

const initialState = {
  profileData: undefined,
  isDeleting: false,
  isLogingOut: false,
  editable: false,
  deleteAccountClicked: false,
  isFormChanged: false,
  isLoading: false,
  profileDataError: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_DATA:
      return {
        isLoading: true,
        profileDataError: undefined
      };
    case SET_PROFILE_DATA:
      return {
        ...state,
        isLoading: false,
        profileData: action.profile,
        profileDataError: undefined
      };
    case GET_PROFILE_FAILED:
      return {
        isLoading: false,
        profileDataError: action.error
      };

    case ON_DELETE_USER:
      return {
        ...state,
        isDeleting: true
      };

    case ON_DELETE_USER_FINISHED:
      return {
        ...state,
        isDeleting: false,
        ...(action.value ? action.value : null)
      };

    case ON_LOG_OUT:
      return {
        ...state,
        isLogingOut: true
      };

    case ON_LOG_OUT_FINISHED:
      return {
        ...state,
        isLogingOut: false,
        ...(action.value ? action.value : null)
      };

    case ON_CHANGE_PROFILE_DATA:
      return {
        ...state,
        isFormChanged: true,
        profileData: {
          ...state.profileData,
          [action.inputName]: action.inputValue
        }
      };

    case TOGGLE_DELETE_ACCOUNT:
      return {
        ...state,
        deleteAccountClicked: !state.deleteAccountClicked
      };
    default:
      return state;
  }
}
