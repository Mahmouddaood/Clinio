import { Platform } from "react-native";
import { Header } from "react-navigation";

export const headerHeight = Header.HEIGHT + 10;

export const backIcons = Platform.select({
  ios: "navigate-before",
  android: "keyboard-backspace"
});

export function backIconsStyle(isRtl) {
  return {
    transform: [{ scaleX: isRtl ? -1 : 1 }]
  };
}

export const backIconProps = {
  color: "#fff",
  underlayColor: "transparent",
  size: 30
};
