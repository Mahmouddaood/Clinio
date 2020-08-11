import AsyncAwaiter from "./AsyncAwaiter";
import { setProfileData } from "../screens/UserProfile/actions";
import { connect } from "react-redux";
import { getDataFormCachedProfile as isLogedIn } from "../utilities/cacheProfile";

function AuthLoading({
  handleSetProfileData,
  profileData,
  navigation: { navigate }
}) {
  isLogedIn().then(async userData => {
    if (userData) {
      if (!Boolean(profileData)) {
        handleSetProfileData(userData);
      } else return navigate("App");
    }
    return navigate("Auth");
  });

  return AsyncAwaiter({ isLoading: true });
}

function mapStateToProps({ profile: { profileData } }) {
  return {
    profileData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSetProfileData: data => dispatch(setProfileData(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoading);
