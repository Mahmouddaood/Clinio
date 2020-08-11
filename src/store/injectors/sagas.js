import { fork, all } from "redux-saga/effects";
import userProfileSaga from "../../screens/UserProfile/saga";
import appointmentsSaga from "../../screens/Appointments/modules/saga";
import favortiesSaga from "../../screens/Favorites/modules/saga";

export default function* rootSaga() {
  yield all([fork(userProfileSaga)]);
  yield all([fork(appointmentsSaga)]);
  yield all([fork(favortiesSaga)]);
}
