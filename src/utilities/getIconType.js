import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FAIcon from "react-native-vector-icons/FontAwesome";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

const customIcons = {};

export const registerCustomIconType = (id, customIcon) => {
  customIcons[id] = customIcon;
};

export default type => {
  switch (type) {
    case "material":
      return MaterialIcon;
    case "antDesign":
      return AntDesignIcon;
    case "material-community":
      return MaterialCommunityIcon;
    case "entypo":
      return EntypoIcon;
    case "font-awesome":
      return FAIcon;
    case "simple-line-icon":
      return SimpleLineIcon;
    case "feather":
      return FeatherIcon;
    default:
      if (customIcons.hasOwnProperty(type)) {
        return customIcons[type];
      }
      return MaterialIcon;
  }
};
