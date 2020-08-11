import React from "react";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import AppRoutes from "./routes";
import { getFromStorage } from "./utilities/LocalStorege";
import { setLocalization, setCountry } from "./components/Localization/action";
import { colors } from "./utilities/theme";

const { Fragment, PureComponent } = React;

console.disableYellowBox = true;
class AppContainer extends PureComponent {
  async componentDidMount() {
    const { handleSetStoreLang, handleSetCountry } = this.props;
    await getFromStorage("country").then(country => {
      handleSetCountry(Boolean(country) ? JSON.parse(country) : undefined);
    });

    await getFromStorage("langType").then(langType => {
      handleSetStoreLang(Boolean(langType) ? langType : "en");
      return SplashScreen.hide();
    });
  }

  render() {
    return (
      <Fragment>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.appPrimary}
        />
        <AppRoutes />
      </Fragment>
    );
  }
}

function mapStateToProps({ langReducer: { langType } }) {
  return {
    langType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSetStoreLang: lang => dispatch(setLocalization(lang)),
    handleSetCountry: country => dispatch(setCountry(country))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
