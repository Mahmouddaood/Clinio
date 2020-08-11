import React from "react";
import { View, StyleSheet } from "react-native";
import { registeredStyles, colors } from "../utilities/theme";

function HeaderSpacer({ style }) {
  return (
    <View
      style={[
        styles.suffixHeader,
        registeredStyles.fullWidth,
        StyleSheet.absoluteFillObject,
        style
      ]}
    />
  );
}

const styles = StyleSheet.create({
  suffixHeader: {
    height: 100,
    backgroundColor: colors.appPrimary
  }
});

export default HeaderSpacer;
