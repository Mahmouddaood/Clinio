import { StyleSheet, Platform } from "react-native";
import { colors } from "../../utilities/theme";

export default StyleSheet.create({
  containerStyle: {
    minHeight: 95,
    borderRadius: 8,
    elevation: Platform.select({ ios: 0, android: 0.6 }),
    marginBottom: 9
  },
  containerSmallViewStyle: {
    minHeight: 70
  },
  innerWrapper: {
    minWidth: "91.5%",
    marginVertical: 3,
    marginHorizontal: 12,
    minHeight: 80
  },
  innerSmallStyle: {
    minHeight: 60
  },
  avatarContainerStyle: {
    borderRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: 13
    },
    shadowRadius: 24,
    shadowOpacity: 1
  },
  avatarStyle: {
    width: 45,
    height: 38,
    borderRadius: 5
  },
  detailsContainer: {
    minHeight: 75,
    paddingStart: 12
  },
  detailsSmallStyle: {
    minHeight: 55,
    maxHeight: 60
  },
  nameSpecAddressContainer: {
    maxWidth: 145
  },
  docNameStyle: {
    height: 18,
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    fontWeight: "500",
    color: colors.placeholder
  },
  specStyle: {
    height: 15,
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.placeholder
  },
  addressStyle: {
    height: 26,
    fontFamily: "Montserrat-Light",
    fontSize: 10,
    fontWeight: "300",
    color: colors.appPrimary,
    marginTop: 6
  },
  timeTextStyle: {
    height: 19,
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
    color: colors.appPrimary,
    fontWeight: "300"
  },
  dateTextStyle: {
    height: 13,
    fontFamily: "Montserrat-Regular",
    fontSize: 10,
    color: colors.placeholder
  },
  statusContainerStyle: {
    backgroundColor: colors.mango,
    minWidth: 70,
    paddingHorizontal: 8,
    height: 18,
    borderRadius: 8
  },
  statusTxtStyle: {
    fontFamily: "Montserrat-Light",
    fontSize: 11,
    fontWeight: "300",
    color: colors.white
  },
  cancledStatus: {
    backgroundColor: "#c30000"
  },
  doneStatus: {
    backgroundColor: colors.appPrimary
  },
  rtlTextStyle: {
    writingDirection: "rtl",
    textAlign: "right"
  }
});
