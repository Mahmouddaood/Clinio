import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, registeredStyles } from "../../utilities/theme";
import Text from "../../components/Text";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import DetailIconSection from "./detailsSectionIcon";

function MainDetails({ data, accordContainerStyle, btnTitle, iconsSections }) {
  if (!data) return null;
  return (
    <View
      style={[
        registeredStyles.shadowStyle,
        accordContainerStyle,
        styles.profileFSection
      ]}
    >
      {Avatar({
        source: { uri: data && data.image },
        xxlarge: true,
        useBorder: true,
        borderWidth: 2,
        containerStyle: [
          styles.userImgStyle,
          registeredStyles.shadowStyle,
          registeredStyles.selfCentered
        ]
        // ...(editable
        //   ? { onPress: handlePickImage(onChange, isRtl) }
        //   : null)
      })}

      <View
        style={[registeredStyles.flexStyle, styles.userDetailsWrapperStyle]}
      >
        {Text({
          center: true,
          children: data && data.userName,
          style: [styles.usernameStyle, registeredStyles.selfCentered]
        })}

        {iconsSections &&
          iconsSections.map((itemArr, idx) => (
            <View
              key={idx}
              style={[
                registeredStyles.rowStyle,
                styles.iconRowWrapperStyle,
                !idx && styles.firstIconSecWrapper
              ]}
            >
              {itemArr &&
                itemArr.map(({ itemkey, ...item }) =>
                  DetailIconSection({
                    value: data && data[itemkey],
                    ...item
                  })
                )}
            </View>
          ))}

        {Button({
          title: btnTitle,
          backgroundColor: colors.mango,
          color: colors.white,
          fontSize: 15,
          fontWeight: "500",
          containerViewStyle: [
            styles.updateBtnStyle,
            registeredStyles.selfCentered
          ]
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileFSection: {
    height: 445,
    top: 95,
    marginBottom: 110
  },
  userImgStyle: {
    position: "absolute",
    top: -110,
    zIndex: 1000
  },
  userDetailsWrapperStyle: {
    top: 65,
    maxHeight: 375
  },
  usernameStyle: {
    fontSize: 18,
    fontWeight: "500",
    position: "absolute",
    fontFamily: "Montserrat-Medium",
    color: colors.placeholder
  },
  updateBtnStyle: {
    bottom: 0,
    position: "absolute",
    minWidth: "40%"
  },
  iconRowWrapperStyle: {
    marginVertical: 10,
    top: 30,
    justifyContent: "space-around"
  },
  firstIconSecWrapper: {
    top: 37
  }
});

export default MainDetails;
