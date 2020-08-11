import React from "react";
import { View, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { registeredStyles, colors } from "../../utilities/theme";
import Text from "../Text";
import Icon from "../Icon";
import {
  backIconProps,
  backIconsStyle,
  backIcons
} from "../../utilities/constants";
const BackImg = require("../../../assets/images/app/halfOrigin.png");
const { width: deviceWidth } = Dimensions.get("screen");

const {
  rowStyle,
  rtlRow,
  selfCentered,
  horizontalCenteredFlex
} = registeredStyles;

function RenderFirstSectionView({
  reservationId,
  isRtl,
  handleGoBack,
  headerText,
  headerLastText,
  innerViewStyle,
  headIconName
}) {
  const iconStyle = backIconsStyle(isRtl);
  return (
    <ImageBackground style={styles.headerContainerStyle} source={BackImg}>
      <View
        style={[styles.headerStyle, innerViewStyle, isRtl ? rtlRow : rowStyle]}
      >
        {Icon({
          name: backIcons,
          onPress: handleGoBack,
          iconStyle,
          ...backIconProps
        })}
      </View>

      <View
        style={[
          styles.headInfoContainerStyle,
          selfCentered,
          horizontalCenteredFlex
        ]}
      >
        {headIconName &&
          Icon({
            name: headIconName,
            type: "simple-line-icon",
            ...backIconProps,
            iconStyle: styles.headerIconTypeStyle,
            size: 65
          })}

        {headerText &&
          Text({
            center: true,
            children: headerText,
            style: styles.headerTextStyle
          })}

        {reservationId &&
          Text({
            center: true,
            children: `${isRtl ? "رقم الحجز" : "ID"}: ${reservationId}`,
            style: styles.reservationIdStyle
          })}

        {headerLastText &&
          Text({
            center: true,
            children: headerLastText,
            style: styles.headerlastTextStyle
          })}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    height: 45
  },
  headerContainerStyle: {
    height: 280,
    width: deviceWidth
  },
  headInfoContainerStyle: {
    minWidth: "92%",
    minHeight: 80
  },
  headerIconTypeStyle: {
    marginBottom: 5
  },
  headerTextStyle: {
    height: 30,
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
    fontWeight: "500",
    color: colors.white
  },
  reservationIdStyle: {
    height: 18,
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: colors.white,
    marginVertical: 3
  },
  headerlastTextStyle: {
    width: 222,
    height: 36,
    fontFamily: "Montserrat-Light",
    fontSize: 14,
    fontWeight: "300",
    color: colors.white
  }
});

export default RenderFirstSectionView;
