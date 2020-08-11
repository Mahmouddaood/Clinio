import { StyleSheet } from "react-native";
import { colors } from "../../utilities/theme";

export default StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.lightGrey,
    flex: 1
  },
  centeredWrapperStyle: {
    minWidth: "92%",
    marginHorizontal: 14
  },
  detailsWrapperStyle: {
    position: "relative",
    top: -140,
    height: 430
  },
  detailsWrapperWidthIconStyle: {
    top: -55,
    marginBottom: 30
  },
  selectionViewStyle: {
    height: 45,
    position: "absolute",
    bottom: 65
  }
});
