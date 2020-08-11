import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "../../utilities/theme";

const { width: devWidth, height: devHeight } = Dimensions.get("window");

const isIphoneX =
  Platform.OS === "ios" &&
  !Platform.isTV &&
  (devHeight === 812 || devWidth === 812);

export default StyleSheet.create({
  imgStyle: {
    minHeight: devHeight,
    width: devWidth,
    backgroundColor: colors.appPrimary
  },
  textStyle: {
    color: colors.white
  },
  itemStyle: {
    justifyContent: "flex-end",
    marginBottom: 90
  },
  titleStyle: {
    fontFamily: "Montserrat-Medium",
    marginTop: 35,
    fontSize: 27,
    fontWeight: "500"
  },
  medText: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "Montserrat-Light",
    fontSize: 22,
    fontWeight: "300",
    color: colors.mango
  },
  lastTextStyle: {
    paddingHorizontal: 20,
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    marginHorizontal: 30
  },
  bottomViewStyle: {
    position: "absolute",
    bottom: 0 + (isIphoneX ? 50 : 0),
    left: 0,
    right: 0
  }
});
