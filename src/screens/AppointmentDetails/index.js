import { StyleSheet } from "react-native";
import AppointmentDetailsHoc from "../../components/AppointmentDetailsView/Hoc";
import RoundedStaticSwitcher from "../../components/RoundedStaticSwitcher";
import { colors } from "../../utilities/theme";

export default AppointmentDetailsHoc(
  function({ children }) {
    return children;
  },
  {
    headerLangTxt: "APOINTDET",
    selectionView: renderSwitcherView
  }
);

function renderSwitcherView({ isRtl, lang, navigate, data }) {
  const options = [
    {
      label: lang && lang[0],
      value: 0,
      containerStyle: styles.fSectionStyle,
      textStyle: styles.textFontSize
    },
    {
      label: lang && lang[1],
      value: 1,
      textStyle: [styles.textStyle, styles.textFontSize]
    }
  ];

  function onSwitch(newValue) {
    return navigate(
      !newValue ? "Reschedule Appointment" : "Appointment Cancellation",
      {
        data
      }
    );
  }

  return RoundedStaticSwitcher({
    isRtl,
    options,
    viewContainerStyle: styles.switcherStyle,
    onPress: onSwitch
  });
}

const styles = StyleSheet.create({
  switcherStyle: {
    backgroundColor: colors.whityGrey,
    marginVertical: 0
  },
  fSectionStyle: {
    backgroundColor: colors.mango
  },
  textStyle: {
    color: colors.placeholder
  },
  textFontSize: {
    fontSize: 14
  }
});
