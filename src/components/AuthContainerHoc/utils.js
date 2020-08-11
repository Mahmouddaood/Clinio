import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utilities/theme";
const { height: deviceHeight, width: deviceWidth } = Dimensions.get("screen");

export default StyleSheet.create({
  containerStyle: {
    width: deviceWidth,
    height: deviceHeight,
    paddingTop: 65
  },
  headerWrapper: {
    marginBottom: 20
  },
  logoStyle: {
    width: 150,
    height: 51,
    marginBottom: 12
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Montserrat-Medium",
    color: colors.white
  },
  cityHeadtext: {
    fontSize: 18,
    fontWeight: "300",
    fontFamily: "Montserrat-Light",
    color: colors.mango
  },
  acountLinkStyle: {
    color: colors.white,
    marginTop: 15,
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: colors.white
  },
  buttonStyle: {
    backgroundColor: colors.mango
  },
  textRight: {
    textAlign: "right"
  }
});
