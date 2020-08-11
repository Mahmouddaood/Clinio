import React from "react";
import { View, StyleSheet } from "react-native";
import { registeredStyles, colors } from "../utilities/theme";
import headerSpacer from "./HeaderSpacer";

function HeroPage({ children, spacerStyle }) {
  return (
    <View style={[styles.containerStyle, registeredStyles.flexStyle]}>
      {headerSpacer(spacerStyle ? { style: spacerStyle } : {})}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.lightGrey
  }
});

export default HeroPage;
