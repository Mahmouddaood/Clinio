import React from "react";
import { View, StyleSheet } from "react-native";
import { registeredStyles, colors } from "../../utilities/theme";
import Avatar from "../../components/Avatar";
import DetailIconSection from "../UserProfile/detailsSectionIcon";

function FirstSignUpAppionts({
  userImg,
  appoints: { appointsText, value },
  lastCheck: { lastCheckText, checkValue }
}) {
  return (
    <View
      style={[
        registeredStyles.flexStyle,
        registeredStyles.verticalCenteredFlex,
        registeredStyles.selfCentered,
        registeredStyles.shadowStyle,
        styles.containerStyle
      ]}
    >
      <View
        style={[
          registeredStyles.flexStyle,
          registeredStyles.rowStyle,
          registeredStyles.horizontalCenteredFlex,
          styles.wrapperStyle
        ]}
      >
        {DetailIconSection({
          title: appointsText,
          value: value,
          name: "calendar",
          type: "antDesign"
        })}

        {Avatar({
          large: true,
          useBorder: true,
          source: { uri: userImg }
        })}

        {DetailIconSection({
          title: lastCheckText,
          value: checkValue,
          name: "calendar",
          type: "antDesign"
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 108,
    borderRadius: 8,
    position: "relative",
    top: 20,
    right: 12,
    minWidth: "95%",
    marginHorizontal: 12,
    backgroundColor: colors.white,
    elevation: 0.4
  },
  wrapperStyle: {
    justifyContent: "space-around"
  }
});

export default FirstSignUpAppionts;
