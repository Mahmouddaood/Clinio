import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, registeredStyles } from "../../utilities/theme";
import Text from "../../components/Text";
import Icon from "../../components/Icon";

function DetailIconSection({ title, value, ...iconProps }) {
  return (
    <View
      key={title}
      style={[styles.iconSectionItem, registeredStyles.selfCentered]}
    >
      {Icon({
        containerStyle: registeredStyles.selfCentered,
        size: 37,
        color: colors.appPrimary,
        ...iconProps
      })}

      {Text({
        children: value,
        style: styles.secTitleStyle,
        center: true
      })}

      {Text({
        children: title,
        style: [styles.secTitleStyle, styles.labelStyle],
        center: true
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  iconSectionItem: {
    minWidth: 78,
    maxWidth: 100
  },
  secTitleStyle: {
    height: 15,
    fontSize: 12,
    height: 15,
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
    color: colors.placeholder
  },
  labelStyle: {
    fontFamily: "Montserrat-Light",
    fontSize: 10,
    fontWeight: "300"
  }
});

export default DetailIconSection;
