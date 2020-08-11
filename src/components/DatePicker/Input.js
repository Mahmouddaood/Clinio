import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { colors, registeredStyles } from "../../utilities/theme";
import Text from "../../components/Text";
import Icon from "../../components/Icon";

const {
  flexStyle,
  rtlRow,
  rowStyle,
  spaceBetweenItems,
  horizontalCenteredFlex,
  selfCentered
} = registeredStyles;

function RenderDateInput({ isRtl, onPress, value = "Month | Day | year" }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
      <View
        style={[
          flexStyle,
          isRtl ? rtlRow : rowStyle,
          spaceBetweenItems,
          horizontalCenteredFlex,
          selfCentered,
          styles.wrapperStyle
        ]}
      >
        {Text({
          children: value,
          style: styles.valueStyle
        })}

        {Icon({
          color: colors.placeholder,
          name: "calendar",
          onPress,
          size: 17,
          type: "antDesign"
        })}
      </View>
    </TouchableOpacity>
  );
}

export default RenderDateInput;
