import React from "react";
import { View } from "react-native";
import Text from "./Text";
import { hasValue } from "../utilities/Validation";
import { registeredStyles, colors } from "../utilities/theme";
import WaveIndicator from "./WaveIndeicator";

const {
  flexStyle,
  horizontalCenteredFlex,
  verticalCenteredFlex,
  fullHeight,
  fullWidth
} = registeredStyles;

function AsyncAwaiter({
  error,
  isLoading,
  children,
  containerViewStyle,
  loaderProps = null
}) {
  if (isLoading && !Boolean(error)) {
    return Container({
      containerViewStyle,
      children: <WaveIndicator color={colors.appPrimary} />
    });
  } else if (hasValue(error)) {
    return Container({
      containerViewStyle,
      children: Text({ children: error, center: true, isError: true })
    });
  }
  return children || null;
}

function Container({ children, containerViewStyle }) {
  return (
    <View
      style={[
        flexStyle,
        horizontalCenteredFlex,
        verticalCenteredFlex,
        fullHeight,
        fullWidth,
        containerViewStyle
      ]}
    >
      {children}
    </View>
  );
}

export default AsyncAwaiter;
