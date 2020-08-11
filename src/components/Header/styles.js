import { StyleSheet } from "react-native";
import { colors } from "../../utilities/theme";
import { headerHeight } from "../../utilities/constants";

export default StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: colors.appPrimary
  },
  transParentStyle: {
    backgroundColor: "transparent"
  },
  outerContainer: {
    backgroundColor: colors.appPrimary,
    paddingHorizontal: 12,
    height: headerHeight
  },
  textStyle: {
    color: colors.white,
    height: 30,
    fontFamily: "Montserrat-Regular",
    fontSize: 16
  },
  rightIconStyle: {
    marginBottom: -2
  },
  lastViewStyle: {
    width: 28
  }
});
