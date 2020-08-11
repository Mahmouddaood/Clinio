import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { registeredStyles, colors } from "../../utilities/theme";
import HeroPage from "../../components/HeroPage";
import HeroViewSections from "../../components/HeroViewSections";
import Text from "../../components/Text";
import { connect } from "react-redux";

function Settings({ lang, userName, country, isRtl }) {
  const lanuage = lang && isRtl ? lang.ARAB : lang.ENG;

  return (
    <HeroPage>
      <View style={[registeredStyles.flexStyle, styles.containerStyle]}>
        {HeroViewSections({
          options: [
            {
              value: lang && lang.ACCONT
            },
            {
              value: userName || "",
              centerText: true
            }
          ]
        })}

        {HeroViewSections({
          containerStyle: styles.langStyle,
          options: [
            {
              value: lang && lang.CountLANG
            },
            {
              value: `${country} / ${lanuage}`,
              centerText: true
            }
          ]
        })}

        {ButtonComponent({
          textValue: lang && lang.CONTACTUS
        })}

        {ButtonComponent({
          textValue: lang && lang.ABOUTCIN
        })}

        {ButtonComponent({
          textValue: lang && lang.LOGOUT
        })}
      </View>
    </HeroPage>
  );
}

function ButtonComponent({ onPress, textValue }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      style={[styles.buttonStyle, registeredStyles.verticalCenteredFlex]}
    >
      {Text({
        center: true,
        style: styles.buttonTitle,
        children: textValue
      })}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 12,
    top: 40
  },
  langStyle: {
    top: 8
  },
  buttonStyle: {
    height: 60,
    borderRadius: 21,
    backgroundColor: colors.whityGrey,
    top: 14,
    marginBottom: 13
  },
  buttonTitle: {
    height: 18,
    fontSize: 14,
    color: colors.placeholder
  }
});

function mapStateToProps({
  langReducer: { lang, langType, country },
  profile: { profileData }
}) {
  return {
    lang,
    isRtl: langType === "ar",
    country: country && country.value,
    userName: profileData && profileData.data && profileData.data.userName
  };
}

export default connect(
  mapStateToProps,
  null
)(Settings);
