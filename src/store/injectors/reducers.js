import { combineReducers } from "redux";

import profile from "../../screens/UserProfile/reducer";
import langReducer from "../../components/Localization/reducer";
import appointments from "../../screens/Appointments/modules/reducer";
import favReducer from "../../screens/Favorites/modules/reducer";

const rootReducer = combineReducers({
  langReducer,
  profile,
  favReducer,
  appointmentsReducer: appointments
});

export default rootReducer;
