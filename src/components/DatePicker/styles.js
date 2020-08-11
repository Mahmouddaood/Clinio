import { StyleSheet } from "react-native";
import { colors } from "../../utilities/theme";

export default StyleSheet.create({
  overlay: {
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,.3)"
  },
  modal: {
    backgroundColor: colors.white,
    height: 260
  },
  modalBtnContainer: {
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    marginTop: 15
  }
});

export const styles = StyleSheet.create({
  containerStyle: {
    width: "92%",
    marginHorizontal: 12,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.whityGrey
  },
  valueStyle: {
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.placeholder
  },
  wrapperStyle: {
    width: "91%"
  }
});
