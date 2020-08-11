import { StyleSheet } from "react-native";
import { colors } from "../../utilities/theme";

export default StyleSheet.create({
  inputStyle: {
    height: 42,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    minWidth: "93%",
    borderRadius: 21,
    borderWidth: 1,
    fontFamily: "Montserrat-Regular",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    borderColor: colors.white,
    marginBottom: 10,
    fontSize: 12,
    color: colors.placeholder,
    backgroundColor: colors.white,
    alignSelf: "center"
  },
  inputValueDirRtl: {
    writingDirection: "rtl"
  },
  inputDisabledStyle: {
    color: colors.disabled
  }
});
