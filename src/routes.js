import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import AuthLoadingScreen from "./components/LoadingAuth";
import AppIntroSlider from "./screens/AppIntroSlider";
import PreferencesScreen from "./components/Localization";
import LoginScreen from "./screens/Login";
import SignUpScreen from "./screens/Register";
import HomeScreen from "./screens/Home";
import UserProfileScreen from "./screens/UserProfile";
import VerificationScreen from "./screens/VerificationCode";
import VerificationSuccess from "./screens/VerificationCode/SuccessScreen";
import UserMedicalID from "./screens/UserMedicalID";
import SearchScreen from "./screens/Search";
import FavoritesScreen from "./screens/Favorites";
import SettingsScreen from "./screens/Settings";
import SearchDocsList from "./screens/DoctorsSearchList";
import SearchSpecialitiesList from "./screens/SpecialitiesSearchList";
import SearchCitiesList from "./screens/CitiesSearchList";
import SearchAreasList from "./screens/AreasSearchList";
import AppointmentsScreen from "./screens/Appointments";
import AppointmentDetailsScreen from "./screens/AppointmentDetails";
import AppointCancelScreen from "./screens/AppointmentCancellation";
import AppointConfirmationScreen from "./screens/AppointmentConfirmation";
import SearchResultScreen from "./screens/SearchResult";
import DoctorProfileScreen from "./screens/DoctorProfile";
import PatientsReviewsScreen from "./screens/PatientsReviews";
import BookScreen from "./screens/Book";
import ReschualeScreen from "./screens/ReschedualeScreen";
import ThanksScreen from "./screens/ThanksScreen";
import FilterScreen from "./screens/FilterScreen";
import InsuranceSearchScreen from "./screens/InsuranceSearchList";

import { renderStacks, createStack } from "./components/Header/stackWithHeader";

import bottomBarOptions from "./utilities/getBottomBarOptions";

const routConfigProps = {
  headerMode: "none",
  navigationOptions: {
    header: null
  }
};

const AuthScreens = [
  {
    screenComponent: PreferencesScreen,
    screenName: "Preferences",
    withHeader: false
  },
  {
    screenComponent: AppIntroSlider,
    screenName: "AppIntro",
    withHeader: false
  },
  {
    screenComponent: LoginScreen,
    screenName: "Login",
    withHeader: false
  },
  {
    screenComponent: SignUpScreen,
    screenName: "SignUp",
    withHeader: false
  },
  {
    screenComponent: VerificationScreen,
    screenName: "Verification",
    useBackIcon: false
  },
  {
    screenComponent: VerificationSuccess,
    screenName: "VerifySuccess",
    withHeader: false
  },
  {
    screenComponent: UserMedicalID,
    screenName: "MedicalId"
  }
];

const AuthStack = createStack({
  stacks: renderStacks(AuthScreens),
  routeConfig: {
    initialRouteName: "Preferences",
    ...routConfigProps
  }
});

const HomeStack = createStack({
  screenComponent: HomeScreen,
  screenName: "Home",
  useBackIcon: false
});

const AppointmentsStack = createStack({
  screenComponent: AppointmentsScreen,
  screenName: "Appointments"
});

const FavoritesStack = createStack({
  screenComponent: FavoritesScreen,
  screenName: "Favorites"
});

const UserProfileStack = createStack({
  screenComponent: UserProfileScreen,
  screenName: "Profile",
  withHeader: false
});

const BottomAppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Appointments: AppointmentsStack,
    Search: SearchScreen,
    Favorites: FavoritesStack,
    Profile: UserProfileStack
  },
  {
    initialRouteName: "Home",
    swipeEnabled: true,
    animationEnabled: true,
    ...bottomBarOptions
  }
);

const appScreens = [
  {
    screenComponent: SearchDocsList,
    screenName: "Select Doctor"
  },
  {
    screenComponent: SearchSpecialitiesList,
    screenName: "Select Speciality"
  },
  {
    screenComponent: SearchCitiesList,
    screenName: "Select City"
  },
  {
    screenComponent: SearchAreasList,
    screenName: "Select Area"
  },
  {
    screenComponent: InsuranceSearchScreen,
    screenName: "Select Insurance"
  },
  {
    screenComponent: SettingsScreen,
    screenName: "Settings"
  },
  {
    screenComponent: SearchResultScreen,
    screenName: "Search Result"
  },
  {
    screenComponent: PatientsReviewsScreen,
    screenName: "Patients' Reviews"
  },
  {
    screenComponent: BookScreen,
    screenName: "Book"
  },
  {
    screenComponent: ReschualeScreen,
    screenName: "Reschedule Appointment"
  },
  {
    screenComponent: FilterScreen,
    screenName: "Filter"
  }
];

const AppStack = createStack({
  stacks: {
    ...renderStacks(appScreens),
    ["Appointment Details"]: AppointmentDetailsScreen,
    ["Appointment Cancellation"]: AppointCancelScreen,
    ["Appointment Confirmation"]: AppointConfirmationScreen,
    DoctorProfile: DoctorProfileScreen,
    ThnksPage: ThanksScreen,
    AppBottomBar: BottomAppStack
  },
  routeConfig: {
    initialRouteName: "AppBottomBar",
    ...routConfigProps
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
