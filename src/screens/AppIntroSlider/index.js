import React from "react";
import { View, ImageBackground, StatusBar } from "react-native";
import styles from "./styles";
import connector from "../../components/connector";
import { colors, registeredStyles } from "../../utilities/theme";
import AppIntroSlider from "../../components/SliderIntro";
import Text from "../../components/Text";
import Button from "../../components/PageLastButton";

const { Fragment } = React;
const imageSlide = require("../../../assets/images/auth/slide-1.png");
const { flexStyle, rowStyle, horizontalCenteredFlex } = registeredStyles;

function AppIntroSlide({ navigation: { navigate }, lang, isRtl }) {
  const slides = lang && [
    {
      key: "slid1",
      title: lang.CONSBSTDOCS,
      text: lang.NURCTY,
      text2: lang.INTROLASTTEXT
    },
    {
      key: "slid2",
      title: lang.CONSBSTDOCS,
      text: lang.NURCTY,
      text2: lang.INTROLASTTEXT
    },
    {
      key: "slid3",
      title: lang.CONSBSTDOCS,
      text: lang.NURCTY,
      text2: lang.INTROLASTTEXT
    }
  ];

  function onPressButton(routeName, params) {
    return function() {
      return navigate(routeName, params);
    };
  }

  const buttonItems = [
    { title: lang && lang.SGNN, onPress: onPressButton("Login") },
    {
      title: lang && lang.GETSTARTED,
      onPress: onPressButton("Home", { getStarted: true })
    }
  ];

  return (
    <Fragment>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <ImageBackground
        progressiveRenderingEnabled
        resizeMode="stretch"
        source={imageSlide}
        style={[styles.imgStyle]}
      >
        <AppIntroSlider
          slides={slides}
          renderItem={renderItem}
          isRtl={isRtl}
          bottomComponent={renderBottomComp(buttonItems)}
        />
      </ImageBackground>
    </Fragment>
  );
}

function renderItem({ title, text, text2 }) {
  return (
    <View style={[horizontalCenteredFlex, flexStyle, styles.itemStyle]}>
      <View>
        {Text({
          style: [styles.textStyle, styles.titleStyle],
          children: title,
          center: true
        })}

        {Text({
          style: styles.medText,
          children: text,
          center: true
        })}

        {Text({
          style: [styles.textStyle, styles.lastTextStyle],
          children: text2,
          center: true
        })}
      </View>
    </View>
  );
}

function renderBottomComp(buttonItems) {
  return (
    <View style={[rowStyle, styles.bottomViewStyle]}>
      {buttonItems.map(({ title, onPress }, idx) => (
        <Button
          key={title}
          onPress={onPress}
          removePosStyle
          buttonStyle={[
            flexStyle,
            { backgroundColor: !idx ? colors.mango : colors.white }
          ]}
          title={title}
          titleStyle={{
            color: !idx ? colors.white : colors.appPrimary
          }}
        />
      ))}
    </View>
  );
}

export default connector({
  langProps: ["CONSBSTDOCS", "NURCTY", "INTROLASTTEXT", "SGNN", "GETSTARTED"]
})(AppIntroSlide);
