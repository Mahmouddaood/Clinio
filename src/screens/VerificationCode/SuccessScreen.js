import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { registeredStyles, colors } from "../../utilities/theme";
import PageWithBackmageHoc from "../../components/PageWithBackmageHoc";
import Text from "../../components/Text";
import Icon from "../../components/Icon";
import Button from "../../components/Button";

const { height: deviceHeight } = Dimensions.get("screen");

const { Fragment } = React;
const {
  shadowStyle,
  flexStyle,
  selfCentered,
  horizontalCenteredFlex
} = registeredStyles;

function VerficationSuccess({ navigation: { getParam, navigate }, lang }) {
  const name = getParam("name");

  function handlePress() {
    return navigate("MedicalId");
  }

  return (
    <Fragment>
      {Text({
        center: true,
        children: "Verfication",
        style: styles.textheaderStyle
      })}

      <View
        style={[
          shadowStyle,
          flexStyle,
          selfCentered,
          horizontalCenteredFlex,
          styles.containerViewStyle
        ]}
      >
        {Icon({
          color: colors.appPrimary,
          size: 132,
          name: "check",
          type: "simple-line-icon",
          underlayColor: colors.white
        })}

        <View style={styles.textWrapperStyle}>
          {Text({
            center: true,
            children: `${lang && lang.HELLO} ${name}`,
            style: [styles.verMsgTextStyle, styles.helloText]
          })}

          {Text({
            center: true,
            children: lang && lang.VERMSG1,
            style: styles.verMsgTextStyle
          })}

          {Text({
            center: true,
            children: lang && lang.VERMSG2,
            style: styles.verMsgTextStyle
          })}

          {Text({
            center: true,
            children: lang && lang.VERMSG3,
            style: styles.verMsgTextStyle
          })}
        </View>

        {Button({
          backgroundColor: colors.mango,
          title: lang && lang.COMPROF,
          containerViewStyle: styles.buttonStyle,
          color: colors.white,
          fontSize: 18,
          fontWeight: "500",
          onPress: handlePress
        })}
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  textheaderStyle: {
    color: colors.white,
    fontSize: 16,
    height: 70,
    lineHeight: 70,
    fontFamily: "Montserrat-Regular"
  },
  helloText: {
    marginBottom: 40
  },
  verMsgTextStyle: {
    fontSize: 15,
    height: 25,
    fontFamily: "Montserrat-Regular",
    color: colors.placeholder
  },
  textWrapperStyle: {
    height: 152,
    marginTop: 55,
    marginBottom: 30
  },
  containerViewStyle: {
    minWidth: "90%",
    maxHeight: deviceHeight - 170,
    marginHorizontal: 30,
    zIndex: 1000,
    borderRadius: 21,
    paddingHorizontal: 12,
    paddingVertical: 62
  },
  buttonStyle: {
    minWidth: "65%"
  }
});

export default PageWithBackmageHoc({
  langProps: ["HELLO", "COMPROF", "VERMSG3", "VERMSG1", "VERMSG2"]
})(VerficationSuccess);
