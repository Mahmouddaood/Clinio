import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../../../utilities/theme";

function renderInputItem({ title, value, isRtl }) {
  const selectTxt = isRtl ? "اختيار" : "Select";
  return (
    <TextInput
      placeholder={`${selectTxt} ${title}`}
      value={value}
      editable={false}
      style={[styles.textInputStyle, isRtl && styles.rtlTextInput]}
    />
  );
}

const styles = StyleSheet.create({
  rtlTextInput: {
    alignSelf: "flex-end"
  },
  textInputStyle: {
    height: 40,
    alignSelf: "flex-start",
    marginHorizontal: 10,
    width: "90%",
    borderBottomColor: colors.whityGrey,
    borderBottomWidth: 2,
    color: colors.placeholder,
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300"
  }
});

export default renderInputItem;
