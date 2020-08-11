import { StyleSheet } from "react-native";
import { colors } from "../../utilities/theme";
export default StyleSheet.create({
  contentContainerStyle: {
    width: "90%",
    height: 360,
    maxHeight: 360
  },
  formSection: {
    position: "absolute",
    top: 12,
    left: 0,
    right: 0,
    paddingTop: 62,
    zIndex: 100,
    height: 300,
    maxHeight: 300,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.white
  },
  fieldsContainer: {
    marginTop: 15,
    height: 84,
    position: "absolute",
    bottom: 62,
    left: 15,
    right: 15
  },
  inputStyle: {
    minWidth: 58,
    marginBottom: 0,
    height: 83,
    borderRadius: 20,
    paddingHorizontal: 0,
    borderWidth: 1.3,
    textAlign: "center",
    borderColor: "#979797"
  },
  headerTextStyle: {
    fontFamily: "Montserrat-Regular",
    height: 19,
    fontSize: 16,
    color: colors.placeholder
  },
  verfTextStyle: {
    minHeight: 43,
    fontSize: 15
  },
  codeLinkStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    color: colors.appPrimary,
    minHeight: 19,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: colors.appPrimary
  }
});
