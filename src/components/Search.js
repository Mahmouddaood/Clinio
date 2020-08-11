import React from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from "react-native";
import { colors, registeredStyles } from "../utilities/theme";
import Icon from "./Icon";

const {
  verticalCenteredFlex,
  rtlRow,
  rowStyle,
  spaceBetweenItems,
  shadowStyle
} = registeredStyles;

function Search({
  containerStyle,
  inputStyle,
  showLoadingIcon,
  loaderStyle,
  placeholder,
  onChangeText,
  isRtl,
  value,
  onPressSearchIcon,
  onPress
}) {
  const WrapperComponent = onPress ? TouchableHighlight : View;
  const wrapperProps = onPress
    ? { onPress, underlayColor: colors.whityGrey }
    : null;
  return (
    <WrapperComponent
      style={[styles.container, verticalCenteredFlex, containerStyle]}
      {...wrapperProps}
    >
      <View
        style={[
          isRtl ? rtlRow : rowStyle,
          spaceBetweenItems,
          shadowStyle,
          styles.searchWrapper
        ]}
      >
        <View
          style={[
            isRtl ? registeredStyles.rtlRow : registeredStyles.rowStyle,
            registeredStyles.verticalCenteredFlex
          ]}
        >
          {Icon({
            size: 22,
            name: "search",
            onPress: onPressSearchIcon,
            color: colors.placeholder
          })}

          <TextInput
            placeholderTextColor={colors.placeholder}
            placeholder={placeholder}
            underlineColorAndroid="transparent"
            onChangeText={onChangeText}
            value={value}
            editable={!onPress}
            style={[
              styles.input,
              inputStyle && inputStyle,
              isRtl && styles.inputValueDirRtl
            ]}
          />
        </View>

        {showLoadingIcon && (
          <ActivityIndicator style={loaderStyle} color={colors.placeholder} />
        )}
      </View>
    </WrapperComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appPrimary,
    height: 55
  },
  searchWrapper: {
    minWidth: "92%",
    marginHorizontal: 12,
    paddingHorizontal: 12,
    maxHeight: 41,
    borderRadius: 10,
    backgroundColor: colors.white
  },
  input: {
    color: colors.placeholder,
    height: 41,
    fontFamily: "Montserrat-Regular",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    fontSize: 12
  },
  inputValueDirRtl: {
    writingDirection: "rtl",
    textAlign: "right"
  }
});

export default Search;
