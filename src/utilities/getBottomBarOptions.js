import { StyleSheet } from "react-native";
import { colors } from "./theme";
import Icon from "../components/Icon";

function getTabBarIcon({ routeName, tintColor }) {
  let iconName;
  switch (routeName) {
    case "Profile":
      iconName = "user";
      break;

    case "Search":
      iconName = "search1";
      break;

    case "Appointments":
      iconName = "calendar";
      break;

    case "Favorites":
      iconName = "hearto";
      break;

    default:
      iconName = "home";
      break;
  }

  return Icon({
    name: iconName,
    type: "antDesign",
    color: tintColor,
    size: 25
  });
}

const styles = StyleSheet.create({
  labelStyle: {
    height: 13,
    fontFamily: "Montserrat-Medium",
    fontSize: 10,
    fontWeight: "500"
  }
});

export default {
  defaultNavigationOptions: function({
    navigation: {
      state: { routeName }
    }
  }) {
    return {
      tabBarVisible: !(routeName === "Search"),
      tabBarIcon: function({ tintColor }) {
        return getTabBarIcon({ routeName, tintColor });
      }
    };
  },
  tabBarOptions: {
    activeTintColor: colors.appPrimary,
    inactiveTintColor: colors.appPrimary,
    upperCaseLabel: false,
    labelStyle: styles.labelStyle
  }
};
