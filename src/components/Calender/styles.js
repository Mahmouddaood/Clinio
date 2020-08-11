import { StyleSheet } from "react-native";
import { colors } from "../../utilities/theme";

export default StyleSheet.create({
  containerStyle: {
    minHeight: 200,
    marginBottom: 12
  },
  wrapperStyle: {
    borderRadius: 8,
    minHeight: 200
  },
  rowItemWrapperStyle: {
    width: "14.28%"
  },
  rowItemStyle: {
    height: 25,
    width: 26,
    fontFamily: "Montserrat-Light",
    fontSize: 16,
    fontWeight: "300",
    color: colors.placeholder
  },
  weekDayText: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
    color: colors.appPrimary
  },
  controllersRow: {
    height: 40,
    backgroundColor: colors.appPrimary
  },
  yearMonthTxtStyle: {
    minWidth: 50,
    height: 22,
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
    fontWeight: "500",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    color: colors.white
  },
  headerStyle: {
    height: 57,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: colors.whityGrey,
    paddingHorizontal: 27
  },
  calenderBodyRow: {
    minHeight: 33
  },
  daysContainerStyle: {
    marginHorizontal: 20,
    paddingVertical: 12
  },
  selectedDayStyle: {
    color: colors.white,
    backgroundColor: colors.appPrimary,
    borderRadius: 25
  }
});
