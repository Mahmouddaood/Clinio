import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../utilities/theme";

function TextElement({
  style,
  children,
  fontFamily,
  isError,
  center,
  applyRtlStyle,
  ...rest
}) {
  return (
    <Text
      ellipsizeMode="tail"
      style={[
        styles.defaultStyle,
        style,
        fontFamily && { fontFamily },
        center && styles.textCentered,
        applyRtlStyle && styles.rtlText,
        isError && styles.errorStyle
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0
  },
  errorStyle: {
    color: colors.appPrimary
  },
  textCentered: {
    textAlign: "center"
  },
  rtlText: {
    textAlign: "right",
    writingDirection: "rtl"
  }
});

export default TextElement;
