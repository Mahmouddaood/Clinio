import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  View,
  Image,
  StatusBar,
  ScrollView
} from "react-native";
import { registeredStyles } from "../../utilities/theme";
import Text from "../Text";
import PageLastButton from "../PageLastButton";
import connector from "../connector";
import styles from "./utils";

const { Fragment } = React;
const BgImg = require("../../../assets/images/auth/origin.png");
const logo = require("../../../assets/images/auth/logo.png");

const {
  flexStyle,
  verticalCenteredFlex,
  horizontalCenteredFlex
} = registeredStyles;

function AuthContainerView({
  onPressButton,
  buttonDisabled,
  lang,
  isSigninForm,
  children,
  isRtl,
  onPressLinkText,
  country,
  childrenContainerStyle
}) {
  return (
    <Fragment>
      <StatusBar hidden />
      <KeyboardAvoidingView
        style={flexStyle}
        {...Platform.select({
          android: null,
          ios: { behavior: "padding", keyboardVerticalOffset: 10 }
        })}
      >
        <ScrollView shouldRasterizeIOS showsVerticalScrollIndicator={false}>
          <ImageBackground source={BgImg} style={styles.containerStyle}>
            <View
              style={[
                styles.headerWrapper,
                verticalCenteredFlex,
                horizontalCenteredFlex
              ]}
            >
              <Image source={logo} style={styles.logoStyle} />
              {Text({
                style: styles.headerText,
                children: lang && isSigninForm ? lang.SIGNNTO : lang.SIGNUPTO,
                center: true
              })}

              {Text({
                style: styles.headerText,
                children:
                  lang && isRtl ? `ل${lang.CONSBSTDOCS}` : lang.CONSBSTDOCS,
                center: true
              })}

              {Text({
                style: styles.cityHeadtext,
                children: lang && lang.NURCTY,
                center: true
              })}
            </View>

            <View style={childrenContainerStyle}>
              {children &&
                children({
                  lang,
                  isRtl,
                  textRight: styles.textRight,
                  iso2: country && country.iso2
                })}
            </View>

            {Text({
              style: styles.acountLinkStyle,
              onPress: onPressLinkText,
              children:
                lang && isSigninForm ? lang.CREATEACCOUNT : lang.HVACCOUNT,
              center: true
            })}
          </ImageBackground>
        </ScrollView>
        {PageLastButton({
          onPress: onPressButton,
          disabled: buttonDisabled,
          title: lang && isSigninForm ? lang.SGNN : lang.SGNUP,
          buttonStyle: styles.buttonStyle
        })}
      </KeyboardAvoidingView>
    </Fragment>
  );
}

export default connector({
  setCountry: true,
  langProps: [
    "SIGNNTO",
    "SIGNUPTO",
    "CONSBSTDOCS",
    "NURCTY",
    "CREATEACCOUNT",
    "HVACCOUNT",
    "SGNN",
    "SGNUP",
    "EMAILADDRESS",
    "PASS",
    "FGPASS",
    "LOGINGO",
    "LOGINFB",
    "FRSTNAME",
    "LASTNAME",
    "CONFPASS",
    "CITY"
  ]
})(AuthContainerView);
