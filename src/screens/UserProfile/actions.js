import {
  SET_PROFILE_DATA,
  ON_DELETE_USER,
  ON_DELETE_USER_FINISHED,
  ON_LOG_OUT,
  ON_LOG_OUT_FINISHED,
  TOGGLE_DELETE_ACCOUNT,
  ON_CHANGE_PROFILE_DATA,
  GET_PROFILE_DATA,
  GET_PROFILE_FAILED
} from "./types";

export const getProfileData = () => ({
  type: GET_PROFILE_DATA
});

export const setProfileData = profile => ({
  type: SET_PROFILE_DATA,
  profile
});

export const getProfileDataFailed = error => ({
  type: GET_PROFILE_FAILED,
  error
});

export const onDeleteUser = navigateAction => ({
  type: ON_DELETE_USER,
  navigateAction
});

export const onDeleteUserFinished = value => ({
  type: ON_DELETE_USER_FINISHED,
  value
});

export const onUserLogOut = navigateAction => ({
  type: ON_LOG_OUT,
  navigateAction
});

export const onLogOutFinished = value => ({
  type: ON_LOG_OUT_FINISHED,
  value
});

export const onFieldChanged = ({ inputName, inputValue }) => ({
  type: ON_CHANGE_PROFILE_DATA,
  inputName,
  inputValue
});

export const toggleDeleteAccount = () => ({
  type: TOGGLE_DELETE_ACCOUNT
});
