import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../Text";
import { registeredStyles } from "../../utilities/theme";

const {
  flexStyle,
  horizontalCenteredFlex,
  verticalCenteredFlex
} = registeredStyles;

function Avatar({
  component,
  onPress,
  onLongPress,
  containerStyle,
  source,
  small,
  medium,
  large,
  xlarge,
  avatarStyle,
  rounded,
  title,
  titleStyle,
  overlayContainerStyle,
  activeOpacity,
  imageProps,
  useBorder,
  borderWidth,
  xxlarge,
  ...attributes
}) {
  let { width, height } = attributes;

  if (small) {
    width = 34;
    height = 34;
  } else if (medium) {
    width = 45;
    height = 45;
  } else if (large) {
    width = 75;
    height = 75;
  } else if (xlarge) {
    width = 144;
    height = 144;
  } else if (xxlarge) {
    width = 168;
    height = 165;
  } else if (!width && !height) {
    width = 34;
    height = 34;
  } else if (!width) {
    width = height;
  } else if (!height) {
    height = width;
  }

  let titleSize = width / 2;

  let Component = onPress || onLongPress ? TouchableOpacity : View;
  if (component) {
    Component = component;
  }

  const renderContent = () => {
    if (source) {
      return (
        <Image
          style={[
            styles.avatar,
            rounded && [styles.avatarBorder, { borderRadius: width / 2 }],
            useBorder && styles.avatarBorder,
            borderWidth && { borderWidth },
            avatarStyle && avatarStyle
          ]}
          progressiveRenderingEnabled
          source={source}
          {...imageProps}
        />
      );
    } else if (title) {
      return Text({
        style: [styles.title, titleStyle && titleStyle],
        children: title,
        center: true
      });
    }
  };

  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      backgroundColor: "transparent",
      width: width,
      height: height
    },
    avatar: {
      width: width,
      height: height
    },
    avatarBorder: {
      borderColor: "#fff",
      borderWidth: 5,
      borderRadius: 8
    },
    postionAbs: {
      position: "absolute",
      right: 0,
      bottom: 0
    },
    overlayContainer: {
      alignSelf: "stretch",
      top: 0,
      left: 0
    },
    title: {
      color: "#ffffff",
      fontSize: titleSize,
      backgroundColor: "rgba(0,0,0,0)"
    }
  });

  return (
    <Component
      {...attributes}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity}
      style={[
        styles.container,
        rounded && { borderRadius: width / 2 },
        useBorder && styles.avatarBorder,
        borderWidth && { borderWidth },
        containerStyle && containerStyle
      ]}
    >
      <View
        style={[
          flexStyle,
          horizontalCenteredFlex,
          verticalCenteredFlex,
          styles.overlayContainer,
          styles.postionAbs,
          rounded && { borderRadius: width / 2 },
          useBorder && styles.avatarBorder,
          borderWidth && { borderWidth },
          overlayContainerStyle && overlayContainerStyle
        ]}
      >
        {renderContent()}
      </View>
    </Component>
  );
}

export default Avatar;
