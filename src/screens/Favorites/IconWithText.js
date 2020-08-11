import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "../../components/Icon";
import Text from "../../components/Text";

function IconWithText({
  iconName = "person-pin-circle",
  iconType,
  title,
  value,
  containerStyle,
  useTitleLargeFontSize
}) {
  let iconProps = null;
  if (iconType) {
    iconProps = { ...iconProps, type: iconType };
  }

  return (
    <View style={[styles.bodyItemContainer, containerStyle]} key={title}>
      {Icon({
        name: iconName,
        size: 24,
        color: "#006fc1",
        ...iconProps,
        containerStyle: styles.iconStyle
      })}
      <View>
        {Text({
          children: title,
          center: true,
          style: [
            styles.bodyItemTitle,
            useTitleLargeFontSize && styles.titleStyleLarge
          ]
        })}
        {Text({
          children: value,
          center: true,
          style: [styles.bodyItemTitle, styles.bodyItemValue]
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyItemContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconStyle: {
    marginRight: 2
  },
  bodyItemTitle: {
    height: 13,
    fontFamily: "Montserrat-Medium",
    fontSize: 10,
    fontWeight: "500",
    color: "rgb(114, 114, 114)"
  },
  bodyItemValue: {
    fontFamily: "Montserrat-Light",
    fontWeight: "300"
  },
  titleStyleLarge: {
    fontSize: 12,
    height: 16
  }
});

export default IconWithText;
