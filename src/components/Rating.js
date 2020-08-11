import React from "react";
import { View } from "react-native";
import Icon from "./Icon";
import { registeredStyles, colors } from "../utilities/theme";

function Rating({ style, rating, size, containerStyle, iconStyle, onPress }) {
  function handlePress(rate) {
    return function() {
      return onPress && onPress(rate);
    };
  }

  return (
    <View
      style={[
        registeredStyles.rowStyle,
        registeredStyles.spaceBetweenItems,
        style
      ]}
    >
      {[1, 2, 3, 4, 5].map(rate => (
        <Icon
          key={rate}
          name={rate <= Math.round(+rating) ? "star" : "star-border"}
          size={size || 17}
          color={colors.mango}
          onPress={handlePress(rate)}
          containerStyle={containerStyle}
          iconStyle={iconStyle}
        />
      ))}
    </View>
  );
}

export default Rating;
