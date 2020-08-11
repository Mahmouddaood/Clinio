import React from "react";
import { ImageBackground, StyleSheet, View, Dimensions } from "react-native";
import Icon from "../../components/Icon";
import { registeredStyles } from "../../utilities/theme";
import {
  backIcons,
  backIconsStyle,
  backIconProps
} from "../../utilities/constants";

const bgImage = require("../../../assets/images/app/halfOrigin.png");
const { width: devWidth } = Dimensions.get("window");

function HeaderBackGround({
  navigation: { navigate, goBack },
  navigateBackTo = "Home",
  isRtl,
  withSettings
}) {
  function handleGoBack() {
    if (navigateBackTo) {
      return navigate(navigateBackTo);
    }
    return goBack();
  }

  function NavigateToSettings() {
    return navigate("Settings");
  }
  const iconStyle = backIconsStyle(isRtl);

  return (
    <ImageBackground
      source={bgImage}
      style={[styles.imageStyle, StyleSheet.absoluteFillObject]}
    >
      <View
        style={[
          registeredStyles.rowStyle,
          isRtl && registeredStyles.rtlRow,
          registeredStyles.spaceBetweenItems,
          styles.headerStyle
        ]}
      >
        {Icon({
          name: backIcons,
          onPress: handleGoBack,
          iconStyle,
          ...backIconProps
        })}

        {withSettings &&
          Icon({
            name: "settings",
            onPress: NavigateToSettings,
            ...backIconProps
          })}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    height: 156,
    width: devWidth
  },
  headerStyle: {
    minWidth: "93%",
    marginHorizontal: 12,
    marginTop: 25
  }
});

export default HeaderBackGround;
