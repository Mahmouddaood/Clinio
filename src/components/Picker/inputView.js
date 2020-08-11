import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  View
} from "react-native";
import { registeredStyles, colors } from "../../utilities/theme";
import Text from "../Text";
import Icon from "../Icon";

function renderPickerInput({
  togglePicker,
  selectedItem,
  placeholder,
  isLoading,
  disabled,
  isRtl
}) {
  return (
    <TouchableOpacity
      onPress={togglePicker}
      disabled={disabled}
      style={[
        registeredStyles.flexStyle,
        isRtl ? registeredStyles.rtlRow : registeredStyles.rowStyle,
        registeredStyles.horizontalCenteredFlex,
        registeredStyles.spaceBetweenItems,
        styles.containerStyle
      ]}
    >
      <View
        style={[
          styles.inpValuesContainer,
          registeredStyles.flexStyle,
          isRtl ? registeredStyles.rtlRow : registeredStyles.rowStyle,
          registeredStyles.horizontalCenteredFlex
        ]}
      >
        {selectedItem && selectedItem.flag && (
          <Image
            style={[
              styles.imageStyle,
              {
                [isRtl ? "marginStart" : "marginEnd"]: 10
              }
            ]}
            source={selectedItem ? selectedItem.flag : null}
          />
        )}

        {Text({
          style: styles.inputTextStyle,
          children: selectedItem ? selectedItem.value : placeholder,
          onPress: togglePicker
        })}
      </View>

      {!(isLoading || disabled) &&
        Icon({
          name: "check",
          color: colors.white,
          size: 23,
          containerStyle: styles.loaderStyle
        })}

      {isLoading && (
        <ActivityIndicator
          size="small"
          style={styles.loaderStyle}
          color={colors.grey2}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    minHeight: 45,
    maxHeight: 50,
    paddingHorizontal: 12
  },
  loaderStyle: {
    marginEnd: 5
  },
  inputTextStyle: {
    fontSize: 12,
    paddingHorizontal: 6,
    color: colors.white,
    fontFamily: "Montserrat-Regular"
  },
  inpValuesContainer: {
    minWidth: "60%",
    width: "60%"
  },
  imageStyle: {
    width: 28,
    height: 20
  }
});

export default renderPickerInput;
