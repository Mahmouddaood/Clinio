import React from "react";
import { View, StyleSheet } from "react-native";
import { registeredStyles } from "../../utilities/theme";
import Avatar from "../Avatar";
import Text from "../Text";

const appLogo = require("../../../assets/images/auth/logo.png");
const {
  flexStyle,
  horizontalCenteredFlex,
  verticalCenteredFlex
} = registeredStyles;

function ViewWithLogo({ textItems }) {
  return (
    <View style={[flexStyle, horizontalCenteredFlex, verticalCenteredFlex]}>
      <View style={[styles.wrapperStyle, horizontalCenteredFlex]}>
        {Avatar({
          source: appLogo,
          width: 231,
          height: 79,
          containerStyle: styles.avatarStyle
        })}

        {textItems &&
          textItems.map(({ value, style, type }, idx) => {
            const textStyle =
              type === "bold" ? styles.HeadText : styles.normalText;
            return (
              <Text
                key={idx}
                children={value}
                style={[textStyle, style]}
                center
              />
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperStyle: {
    width: 300
  },
  avatarStyle: {
    marginBottom: 8,
    height: 80
  },
  HeadText: {
    height: 70,
    fontFamily: "Montserrat-Medium",
    fontSize: 25,
    fontWeight: "500",
    color: "#fff"
  },
  normalText: {
    height: 40,
    fontFamily: "Montserrat-Light",
    fontSize: 14,
    fontWeight: "300",
    color: "#fff"
  }
});

export default ViewWithLogo;
