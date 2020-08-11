import { StyleSheet } from "react-native";
import { colors } from "../../../utilities/theme";

export default StyleSheet.create({
  profileFSection: {
    minHeight: 265,
    top: 95,
    marginBottom: 105,
    borderRadius: 8,
    position: "relative",
    zIndex: 500,
    paddingHorizontal: 12,
    marginTop: 9
  },
  docImgStyle: {
    position: "absolute",
    top: -110,
    zIndex: 1000
  },
  docDetailsWrapperStyle: {
    marginTop: 65,
    minHeight: 235
  },
  docNameStyle: {
    height: 23,
    fontFamily: "Montserrat-Medium",
    fontSize: 18,
    fontWeight: "500",
    color: colors.placeholder
  },
  favIconStyle: {
    position: "absolute",
    top: 18,
    right: 13
  },
  specStyle: {
    height: 20,
    fontFamily: "Montserrat-Light",
    fontSize: 14,
    fontWeight: "300",
    color: colors.placeholder
  },
  buttonContainer: {
    height: 25,
    borderRadius: 21,
    backgroundColor: colors.mango,
    paddingHorizontal: 9,
    marginVertical: 4
  },
  buttonTextStyle: {
    height: 16,
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.white
  },
  locfessContainer: {
    height: 50,
    minWidth: "85%",
    marginHorizontal: "7.5%",
    marginBottom: 14,
    marginTop: 5
  },
  iconTextStyle: {
    flex: 0,
    height: 38
  },
  aboutDocTextStyle: {
    height: 60,
    minWidth: "85%",
    marginHorizontal: "7.5%",
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.placeholder
  },
  addressTextStyle: {
    height: 37,
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: colors.appPrimary,
    marginTop: 10
  }
});
