import React from "react";
import { StyleSheet, Image } from "react-native";
import AuthContainer from "../../components/AuthContainerHoc";
import Input from "../../components/Input";
import Text from "../../components/Text";
import Button from "../../components/Button";
const facImg = require("../../../assets/images/auth/facebook.png");
const gogImg = require("../../../assets/images/auth/google.png");

const { useState, Fragment } = React;

function LoginScreen({ navigation: { navigate } }) {
  const [email, setEmail] = useState(undefined);
  const [pass, setPassword] = useState(undefined);
  const [isLoading, setLoadingValue] = useState(false);

  function useOnChange(inpName) {
    return function(value) {
      return inpName === "email" ? setEmail(value) : setPassword(value);
    };
  }

  function onPressLinkText() {
    return navigate("SignUp");
  }

  function onPressSignIn() {
    setLoadingValue(true);
    setTimeout(() => {
      setLoadingValue(false);
      return navigate("Home");
    }, 800);
  }

  function renderButtonProps(imgItem) {
    return {
      imageIconValue: <Image source={imgItem} style={styles.socialImgStyle} />,
      onPress: undefined,
      disabled: isLoading,
      fontSize: 11,
      fontFamily: "Montserrat-Regular"
    };
  }

  return (
    <AuthContainer
      isSigninForm
      buttonDisabled={isLoading}
      onPressButton={onPressSignIn}
      onPressLinkText={onPressLinkText}
      childrenContainerStyle={styles.containerViewStyle}
    >
      {({ lang, isRtl, textRight }) => (
        <Fragment>
          {Input({
            isRTL: isRtl,
            value: email,
            placeholder: lang && lang.EMAILADDRESS,
            keyboardType: "email-address",
            onChange: useOnChange("email")
          })}

          {Input({
            isRTL: isRtl,
            value: pass,
            style: isRtl && textRight,
            secureTextEntry: true,
            placeholder: lang && lang.PASS,
            onChange: useOnChange()
          })}

          {Text({
            children: lang && lang.FGPASS,
            style: [styles.fPassStyle, isRtl && styles.rtlText]
          })}

          {Button({
            title: lang && lang.LOGINGO,
            ...renderButtonProps(gogImg)
          })}

          {Button({
            title: lang && lang.LOGINFB,
            ...renderButtonProps(facImg)
          })}
        </Fragment>
      )}
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  containerViewStyle: {
    minHeight: 320
  },
  fPassStyle: {
    textAlign: "right",
    fontSize: 12,
    height: 25,
    fontFamily: "Montserrat-Regular",
    marginTop: 12,
    marginBottom: 30,
    color: "#fff",
    width: "93%"
  },
  rtlText: {
    textAlign: "left",
    writingDirection: "rtl"
  },
  socialImgStyle: {
    height: 20,
    width: 20,
    marginRight: 10
  }
});

export default LoginScreen;
