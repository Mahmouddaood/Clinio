import { takeLatest, put, select, all } from "redux-saga/effects";
import { ON_DELETE_USER, ON_LOG_OUT, GET_PROFILE_DATA } from "./types";
import Alert from "../../components/Alert";
import {
  onLogOutFinished,
  setProfileData,
  getProfileDataFailed
} from "./actions";
import { removeCachedProfile } from "../../utilities/cacheProfile";
import { patientProfile } from "../../utilities/data";

const profileSelector = ({ profile }) => profile;
const rtlSelector = ({ langReducer }) => langReducer;

const getProfile = () => {
  const { reports, ...otherData } = patientProfile;
  return {
    reports,
    data: otherData
  };
};

function* requestDeleteCurrentUser({ navigateAction }) {
  try {
    const { profileData } = yield select(profileSelector);
    console.log("profileData", profileData);
  } catch (error) {
    return yield Alert(deleteuserAlert);
  }
}

function* requestPatientProfile() {
  const { lang } = yield select(rtlSelector);
  const error = lang && lang.ERROR;
  try {
    const data = yield getProfile();
    if (data) {
      return yield put(setProfileData(data));
    }
    return yield put(getProfileDataFailed(error));
  } catch (error) {
    return yield put(getProfileDataFailed(error));
  }
}

function* requestLogUsrOut({ navigateAction }) {
  try {
    yield removeCachedProfile();
    return yield put(
      onLogOutFinished({
        profileData: undefined
      })
    );
  } catch (error) {
    yield put(onLogOutFinished());
  }
}

export default function* userProfileSaga() {
  yield all([takeLatest(GET_PROFILE_DATA, requestPatientProfile)]);
  yield all([takeLatest(ON_DELETE_USER, requestDeleteCurrentUser)]);
  yield all([takeLatest(ON_LOG_OUT, requestLogUsrOut)]);
}
