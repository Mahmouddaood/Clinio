import { createMaterialTopTabNavigator } from "react-navigation";
import { StyleSheet } from "react-native";
import UpComingAppointments from "./UpcomingView";
import HistoryAppointments from "./HistoryView";
import { colors } from "../../utilities/theme";

const styles = StyleSheet.create({
  tabsContainer: {
    backgroundColor: colors.appPrimary
  },
  labelStyle: {
    height: 19,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    fontWeight: "200",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center"
  },
  indicatorStyle: {
    height: 5,
    backgroundColor: colors.mango
  }
});

export default createMaterialTopTabNavigator(
  {
    Upcoming: UpComingAppointments,
    History: HistoryAppointments
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    initialRouteName: "Upcoming",
    lazy: true,
    tabBarOptions: {
      style: styles.tabsContainer,
      labelStyle: styles.labelStyle,
      upperCaseLabel: false,
      indicatorStyle: styles.indicatorStyle
    },
    defaultNavigationOptions: {
      header: null
    }
  }
);
