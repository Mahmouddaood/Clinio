import React from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { colors, registeredStyles } from "../../../../utilities/theme";
import Avatar from "../../../../components/Avatar";
import Text from "../../../../components/Text";

function ItemDoctorView({ image, name, speciality, id, onPress, shoudMargin }) {
  function handlePress() {
    return onPress && onPress(id);
  }

  return (
    <TouchableOpacity
      style={[
        registeredStyles.shadowStyle,
        styles.itemContainer,
        registeredStyles.horizontalCenteredFlex,
        shoudMargin && styles.containerMargin
      ]}
      onPress={handlePress}
    >
      {Avatar({
        source: { uri: image },
        avatarStyle: styles.avatarStyle,
        containerStyle: [styles.avatarContainerStyle, styles.avatarStyle]
      })}

      {Text({
        children: name,
        style: styles.docNameStyle,
        center: true
      })}

      {Text({
        children: speciality,
        style: styles.docSpecStyle,
        center: true
      })}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 150,
    maxHeight: 195,
    borderRadius: 15,
    elevation: Platform.select({ ios: 0, android: 0.6 }),
    paddingTop: 6,
    paddingBottom: 6
  },
  containerMargin: {
    marginRight: 8
  },
  avatarContainerStyle: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: colors.placeholder,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: 13
    },
    shadowRadius: 24
  },
  avatarStyle: {
    width: 141,
    height: 124,
    borderRadius: 15
  },
  docNameStyle: {
    width: 130,
    height: 15,
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
    fontWeight: "500",
    color: colors.placeholder
  },
  docSpecStyle: {
    width: 89,
    height: 15,
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.placeholder
  }
});

export default ItemDoctorView;
