import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utilities/theme";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  buttonContainer: {
    minHeight: 50,
    maxHeight: 50,
    borderRadius: 25,
    marginHorizontal: 18,
    borderColor: colors.appPrimary,
    backgroundColor: colors.appPrimary
  },
  listItemStyle: {
    height: 48,
    minWidth: width - 25,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey0
  },
  selectedListItem: {
    backgroundColor: colors.whityGrey
  },
  listItemTitle: {
    fontFamily: "Montserrat-Regular",
    paddingHorizontal: 12,
    color: colors.placeholder,
    minHeight: 15,
    fontSize: 12
  },
  modalViewBottom: {
    height: 215,
    backgroundColor: "#D0D4DB"
  }
});
