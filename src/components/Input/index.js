import React from "react";
import { TextInput } from "react-native";
import styles from "./style";
import { colors } from "../../utilities/theme";

function Input({
  editable = true,
  value,
  style,
  onChange,
  placeholder,
  isRTL,
  ...otherProps
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      shouldRasterizeIOS
      autoCapitalize="none"
      allowFontScaling
      selectionColor={colors.appPrimary}
      placeholderTextColor={colors.placeholder}
      autoCorrect={false}
      editable={editable}
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      style={[
        styles.inputStyle,
        !editable ? styles.inputDisabledStyle : null,
        isRTL && styles.inputValueDirRtl,
        style
      ]}
      {...otherProps}
    />
  );
}

export default Input;
