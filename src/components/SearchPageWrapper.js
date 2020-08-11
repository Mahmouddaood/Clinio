import React from "react";
import { View } from "react-native";
import SearchInput from "../components/Search";
import { registeredStyles } from "../utilities/theme";

function PageWithSearchHeader({
  placeholder,
  isRtl,
  children,
  onPress,
  onChangeText,
  value,
  showLoadingIcon,
  onPressSearchIcon
}) {
  return (
    <View style={registeredStyles.flexStyle}>
      {SearchInput({
        placeholder,
        isRtl,
        onPress,
        onChangeText,
        value,
        showLoadingIcon,
        onPressSearchIcon
      })}

      {children}
    </View>
  );
}

export default PageWithSearchHeader;
