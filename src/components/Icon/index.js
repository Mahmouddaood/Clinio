import React from "react";
import { TouchableHighlight, View, StyleSheet } from "react-native";
import getIconType from "../../utilities/getIconType";

function Icon({
  type,
  name,
  size = 24,
  color = "#fff",
  iconStyle,
  component,
  underlayColor = "transparent",
  containerStyle,
  onPress,
  ...attributes
}) {
  let Component = View;
  if (onPress) {
    Component = TouchableHighlight;
  }
  if (component) {
    Component = component;
  }
  let Icon;
  if (!type) {
    Icon = getIconType("material");
  } else {
    Icon = getIconType(type);
  }
  return (
    <Component
      {...attributes}
      underlayColor={underlayColor || color}
      style={[
        styles.transparentStyle,
        styles.wrapperStyle,
        containerStyle && containerStyle
      ]}
      onPress={onPress}
    >
      <Icon
        style={[styles.transparentStyle, iconStyle && iconStyle]}
        size={size}
        name={name}
        color={color}
      />
    </Component>
  );
}

const styles = StyleSheet.create({
  wrapperStyle: {
    justifyContent: "center"
  },
  transparentStyle: {
    backgroundColor: "transparent"
  }
});

export default Icon;
