import React from "react";
import { View, StyleSheet, Platform, TouchableHighlight } from "react-native";
import Text from "./Text";
import { registeredStyles, colors } from "../utilities/theme";

function ViewItem({ containerStyle, options }) {
  return (
    <View
      style={[
        registeredStyles.shadowStyle,
        styles.containerStyle,
        containerStyle
      ]}
    >
      {options &&
        options.map((item, idx) => {
          const {
            value = undefined,
            style = null,
            txtStyle = null,
            centerText = !idx,
            onPress
          } = item;

          const isFirstItemNotText = !idx && isValidComponent(value);
          const isSecondItemNotText = !!idx && isValidComponent(value);
          const WrapperComponent = isSecondItemNotText
            ? TouchableHighlight
            : View;

          const wrapperProps = isSecondItemNotText
            ? { onPress, underlayColor: colors.white }
            : null;

          const valueComponent =
            isSecondItemNotText || isFirstItemNotText
              ? value
              : Text({
                  children: value,
                  center: centerText,
                  onPress,
                  style: !idx
                    ? [styles.headerTextStyle, txtStyle]
                    : [styles.valueStyle, txtStyle]
                });

          return (
            <WrapperComponent
              key={idx}
              style={[
                styles.sectionStyle,
                registeredStyles.verticalCenteredFlex,
                !idx ? styles.fSecStyle : styles.sSecStyle,
                style
              ]}
              {...wrapperProps}
            >
              {valueComponent}
            </WrapperComponent>
          );
        })}
    </View>
  );
}

function isValidComponent(child) {
  return child && !(typeof child === "number" || typeof child === "string");
}

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 8,
    minHeight: 92,
    marginBottom: 10,
    ...Platform.select({ ios: null, android: { elevation: 2 } })
  },
  sectionStyle: {
    minHeight: 47
  },
  fSecStyle: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: colors.whityGrey
  },
  sSecStyle: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: colors.white
  },
  headerTextStyle: {
    minHeight: 18,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: colors.placeholder
  },
  valueStyle: {
    minHeight: 15,
    fontSize: 12,
    fontWeight: "300",
    color: colors.placeholder
  }
});

export default ViewItem;
