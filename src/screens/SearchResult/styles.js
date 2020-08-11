import { StyleSheet } from "react-native";
import { colors } from "../../utilities/theme";

export default StyleSheet.create({
  conatinerStyle: {
    minHeight: 248,
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden"
  },
  appointItemViewStyle: {
    elevation: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    borderRadius: 0,
    minHeight: 62,
    maxHeight: 62,
    paddingTop: 3,
    backgroundColor: colors.whityGrey
  },
  appointInnerViewStyle: {
    marginHorizontal: 20,
    minWidth: "90%",
    marginVertical: 0,
    minHeight: 60
  },
  ratingStyle: {
    alignItems: "flex-end",
    height: 35
  },
  contentStyle: {
    minWidth: "80%",
    marginLeft: "15%",
    marginRight: "5%",
    minHeight: 120,
    paddingRight: 8
  },
  rtlContentStyle: {
    marginRight: "15%",
    marginLeft: "5%",
    paddingLeft: 8,
    paddingRight: 0
  },
  aboutDoctorStyle: {
    minHeight: 70,
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.placeholder
  },
  rtlTextStyle: {
    writingDirection: "rtl",
    textAlign: "right"
  },
  otherTextStyle: {
    minHeight: 16,
    height: 20
  },
  iconStyle: {
    width: 16,
    height: 16,
    marginRight: 6
  },
  rtlIconStyle: {
    marginLeft: 6,
    marginRight: 0
  },
  availabityContainer: {
    flex: 2
  },
  availabityText: {
    color: colors.placeholder
  }
});
