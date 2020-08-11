import React from "react";
import {
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  View,
  Platform,
  ActivityIndicator
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Text from "./Text";
import { colors, registeredStyles } from "../utilities/theme";
import getIconType from "../utilities/getIconType";

const {
  rowStyle,
  horizontalCenteredFlex,
  verticalCenteredFlex
} = registeredStyles;

function Button({
  disabled,
  loading,
  loadingRight,
  activityIndicatorStyle,
  buttonStyle,
  borderRadius = 21,
  title,
  onPress,
  icon,
  iconComponent,
  backgroundColor,
  color,
  fontSize,
  textStyle,
  iconRight,
  fontWeight,
  fontFamily,
  containerViewStyle,
  transparent,
  allowFontScaling,
  imageIconValue,
  imageRight,
  ...attributes
}) {
  let { Component, rightIcon, leftIcon } = attributes;

  let leftIconElement;
  if (!leftIcon && icon) {
    leftIcon = icon;
  }

  if (leftIcon) {
    let Icon;
    if (iconComponent) {
      Icon = iconComponent;
    } else if (!leftIcon.type) {
      Icon = MaterialIcon;
    } else {
      Icon = getIconType(leftIcon.type);
    }
    leftIconElement = (
      <Icon
        {...leftIcon}
        color={leftIcon.color || "white"}
        size={leftIcon.size || 18}
        style={[styles.icon, leftIcon.style && leftIcon.style]}
      />
    );
  }

  let rightIconElement;
  if (iconRight || rightIcon) {
    if (!rightIcon) {
      rightIcon = iconRight;
    }
    let Icon;
    if (iconComponent) {
      Icon = iconComponent;
    } else if (!rightIcon.type) {
      Icon = MaterialIcon;
    } else {
      Icon = getIconType(rightIcon.type);
    }
    rightIconElement = (
      <Icon
        {...rightIcon}
        color={rightIcon.color || "white"}
        size={rightIcon.size || 18}
        style={[styles.iconRight, rightIcon.style && rightIcon.style]}
      />
    );
  }

  let loadingElement;
  if (loading) {
    loadingElement = (
      <ActivityIndicator
        animating={true}
        style={[styles.activityIndicatorStyle, activityIndicatorStyle]}
        color={color || "white"}
        size="small"
      />
    );
  }

  if (!Component) {
    Component = Platform.select({
      ios: TouchableHighlight,
      android: TouchableNativeFeedback
    });
  }

  if (!Component) {
    Component = TouchableHighlight;
  }

  return (
    <View
      style={[
        styles.container,
        containerViewStyle,
        borderRadius && { borderRadius }
      ]}
    >
      <Component
        {...attributes}
        underlayColor="transparent"
        onPress={onPress || undefined}
        disabled={disabled || false}
      >
        <View
          pointerEvents="box-only"
          style={[
            styles.button,
            rowStyle,
            horizontalCenteredFlex,
            verticalCenteredFlex,
            backgroundColor && { backgroundColor: backgroundColor },
            borderRadius && { borderRadius },
            transparent && styles.transParentStyle,
            buttonStyle && buttonStyle,
            disabled && { backgroundColor: colors.disabled }
          ]}
        >
          {!imageRight && imageIconValue && imageIconValue}
          {(icon && !iconRight) || leftIconElement ? leftIconElement : null}
          {loading && !loadingRight && loadingElement}

          {Text({
            allowFontScaling: allowFontScaling,
            fontFamily,
            style: [
              styles.text,
              color && { color },
              fontSize && { fontSize },
              textStyle && textStyle,
              fontWeight && { fontWeight }
            ],
            children: title
          })}

          {loading && loadingRight && loadingElement}
          {(icon && iconRight) || rightIconElement ? rightIconElement : null}
          {imageRight && imageIconValue && imageIconValue}
        </View>
      </Component>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: "93%",
    marginHorizontal: 10,
    marginBottom: 10
  },
  button: {
    height: 42,
    backgroundColor: colors.white
  },
  text: {
    color: colors.placeholder,
    fontSize: 14
  },
  icon: {
    marginRight: 10
  },
  iconRight: {
    marginLeft: 10
  },
  activityIndicatorStyle: {
    marginHorizontal: 10,
    height: 0
  },
  transParentStyle: {
    borderWidth: 0,
    backgroundColor: "transparent"
  }
});

export default Button;
