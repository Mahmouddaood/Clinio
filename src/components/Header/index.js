import React from "react";
import { View, SafeAreaView } from "react-native";
import connector from "../connector";
import styles from "./styles";
import { registeredStyles } from "../../utilities/theme";
import Icon from "../Icon";
import {
  backIconsStyle,
  backIcons,
  backIconProps
} from "../../utilities/constants";

const { Suspense, lazy } = React;
const Text = lazy(() => import("../Text"));
const Avatar = lazy(() => import("../Avatar"));
const appLogo = require("../../../assets/images/auth/logo.png");

const {
  flexStyle,
  rtlRow,
  rowStyle,
  spaceBetweenItems,
  horizontalCenteredFlex,
  selfCentered
} = registeredStyles;

function AppHeader({
  useBackIcon,
  transparent,
  navigation: {
    goBack,
    navigate,
    state: { routeName }
  },
  isRtl,
  onMomentGoback,
  isLoggedInUser
}) {
  function handlGoBack() {
    if (onMomentGoback) {
      onMomentGoback();
    }
    return goBack();
  }

  function onPressRightIcon(routName) {
    return function() {
      return navigate(routName);
    };
  }

  const iconStyle = backIconsStyle(isRtl);

  let shouldHaveRightIcon = false;
  let rightIconProps = null;
  if (routeName === "Home" && isLoggedInUser) {
    shouldHaveRightIcon = true;
    rightIconProps = {
      name: "settings",
      onPress: onPressRightIcon("Settings")
    };
  }

  if (routeName === "Search Result") {
    shouldHaveRightIcon = true;
    rightIconProps = {
      name: "filter-list",
      onPress: onPressRightIcon("Filter")
    };
  }

  return (
    <SafeAreaView
      style={[styles.safeAreaViewStyle, transparent && styles.transParentStyle]}
    >
      <View style={styles.outerContainer}>
        <View style={[flexStyle, isRtl ? rtlRow : rowStyle, spaceBetweenItems]}>
          {useBackIcon &&
            Icon({
              name: backIcons,
              onPress: handlGoBack,
              iconStyle,
              ...backIconProps,
              containerStyle: selfCentered
            })}

          <View style={[flexStyle, horizontalCenteredFlex, selfCentered]}>
            <Suspense fallback={<View />}>
              {routeName === "Home" ? (
                <Avatar source={appLogo} width={81} height={27} />
              ) : (
                <Text children={routeName} style={styles.textStyle} />
              )}
            </Suspense>
          </View>

          {shouldHaveRightIcon ? (
            Icon({
              ...rightIconProps,
              ...backIconProps,
              containerStyle: selfCentered
            })
          ) : (
            <View style={styles.lastViewStyle} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function getState({ profile }) {
  return {
    isLoggedInUser: !!profile.profileData
  };
}

export default connector({
  getState
})(AppHeader);
