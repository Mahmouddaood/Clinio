import { StyleSheet, Platform } from "react-native";

export const colors = {
  white: "#ffffff",
  lightGrey: "#f7f7f7",
  whityGrey: "rgb(232, 232, 232)",
  appPrimary: "#006fc1",
  grey0: "#dbdbdb",
  grey2: "#646464",
  error: "#e51d35",
  disabled: "#dadee0",
  mango: "rgb(255, 177, 46)",
  placeholder: "rgb(114, 114, 114)",
  searchBg: "#303337"
};

export const registeredStyles = StyleSheet.create({
  flexStyle: {
    flex: 1
  },
  verticalCenteredFlex: {
    justifyContent: "center"
  },
  selfCentered: {
    alignSelf: "center"
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  horizontalCenteredFlex: {
    alignItems: "center"
  },
  spaceBetweenItems: {
    justifyContent: "space-between"
  },
  rowStyle: {
    flexDirection: "row"
  },
  shadowStyle: {
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.white,
        shadowOffset: { height: 0, width: 2 },
        shadowOpacity: 0.2,
        borderRadius: 2
      },
      android: {
        elevation: 1
      }
    })
  },
  fullHeight: {
    height: "100%"
  },
  fullWidth: {
    width: "100%"
  }
});
