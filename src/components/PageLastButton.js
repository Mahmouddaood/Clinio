import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "./Text";
import { colors } from "../utilities/theme";

export default function({
  title,
  titleStyle,
  onPress,
  buttonStyle,
  removePosStyle,
  disabled
}) {
  return (
    <TouchableOpacity
      style={[
        styles.containerStyle,
        !removePosStyle && styles.postionStyle,
        buttonStyle
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {Text({
        children: title,
        style: [
          styles.titTextStyle,
          titleStyle,
          disabled && styles.disabledStyle
        ],
        center: true
      })}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.appPrimary,
    minHeight: 69,
    justifyContent: "center"
  },
  postionStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  titTextStyle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Montserrat-Medium"
  },
  disabledStyle: {
    color: colors.placeholder
  }
});
