import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import Text from "./Text";
import { colors, registeredStyles } from "../utilities/theme";

function RoundedStaticSwitcher({
  isRtl,
  viewContainerStyle,
  options,
  onPress
}) {
  return (
    <View
      style={[
        styles.containerStyle,
        isRtl ? registeredStyles.rtlRow : registeredStyles.rowStyle,
        viewContainerStyle
      ]}
    >
      {options &&
        options.map((item, idx) => {
          const {
            label,
            value = undefined,
            containerStyle,
            textStyle,
            centerText = true
          } = item;
          function handlePress() {
            return onPress && onPress(value);
          }

          return (
            <TouchableHighlight
              key={label || idx}
              underlayColor="transparent"
              style={[
                registeredStyles.flexStyle,
                registeredStyles.verticalCenteredFlex,
                styles.sectionStyle,
                !idx && styles.fSectionContainerStyle,
                containerStyle
              ]}
              onPress={handlePress}
            >
              {Text({
                children: label,
                center: centerText,
                style: [
                  styles.labelTextStyle,
                  textStyle,
                  !centerText && isRtl && styles.rtlTextStyle
                ]
              })}
            </TouchableHighlight>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 32,
    marginVertical: 12,
    marginHorizontal: 20,
    minWidth: "90%",
    backgroundColor: colors.mango,
    borderRadius: 21
  },
  fSectionContainerStyle: {
    overflow: "hidden",
    backgroundColor: colors.whityGrey
  },
  sectionStyle: {
    borderRadius: 21,
    paddingHorizontal: 15
  },
  labelTextStyle: {
    fontFamily: "Montserrat-Medium",
    fontSize: 11,
    fontWeight: "500",
    color: colors.white
  },
  rtlTextStyle: {
    writingDirection: "rtl",
    textAlign: "right"
  }
});

export default RoundedStaticSwitcher;
