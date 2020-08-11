import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Switcher from "../Switcher";
import connector from "../connector";
import Header from "../Header";
import Text from "../Text";
import CountryPicker from "../Picker";
import PageButton from "../PageLastButton";
import { registeredStyles, colors } from "../../utilities/theme";
import { saveToStorage } from "../../utilities/LocalStorege";
import { countries } from "../../utilities/data";
import { setLocalization, setCountry } from "./action";

const { Fragment } = React;
const { flexStyle, verticalCenteredFlex, shadowStyle } = registeredStyles;

function ChangeLocalizationView({
  navigation,
  lang,
  handleChangeLoc,
  isLoading,
  country,
  handleChangeCountry,
  isRtl
}) {
  const { goBack, navigate, getParam } = navigation;
  const useBackIcon = getParam("useBackIcon");

  const options = [
    {
      label: lang && lang.ENG,
      value: "en"
    },
    {
      label: lang && lang.ARAB,
      value: "ar"
    }
  ];

  async function onChangeLang(newValue) {
    return await saveToStorage("langType", newValue).then(() => {
      handleChangeLoc(newValue);
    });
  }

  async function onChangeCountry(country) {
    console.log("country =>", country);
    return await saveToStorage("country", JSON.stringify(country)).then(() =>
      handleChangeCountry(country)
    );
  }

  function handleDonePress() {
    return useBackIcon ? goBack() : navigate("AppIntro");
  }

  return (
    <Fragment>
      <Header useBackIcon={useBackIcon} navigation={navigation} />
      <View style={[flexStyle, styles.containerStyle]}>
        {ViewWithShadow({
          textValue: lang && lang.COUNTRY,
          isRtl,
          children: (
            <Switcher
              initial={isRtl ? 1 : 0}
              isRtl={isRtl}
              onPress={onChangeLang}
              options={options}
            />
          )
        })}

        {ViewWithShadow({
          textValue: lang && lang.COUNTRYRESD,
          isRtl,
          children: (
            <CountryPicker
              initialValue={country}
              placeholder={lang && lang.SLCTCNTRY}
              items={countries}
              isRtl={isRtl}
              isLoading={isLoading}
              disabled={
                !countries || (Array.isArray(countries) && countries.length < 1)
              }
              onSelect={onChangeCountry}
            />
          )
        })}

        {PageButton({
          title: lang && lang.DONE,
          onPress: handleDonePress
        })}
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.whityGrey
  },
  sectionStyle: {
    marginTop: 12,
    marginHorizontal: 12,
    maxHeight: 140,
    borderRadius: 15
  },
  textStyle: {
    marginBottom: 15,
    fontFamily: "Montserrat-Regular",
    minHeight: 20,
    fontSize: 12,
    color: colors.placeholder,
    marginHorizontal: 25
  },
  rtlTextStyle: {
    writingDirection: "rtl",
    ...Platform.select({
      ios: {
        textAlign: "right"
      },
      android: null
    })
  }
});

function ViewWithShadow({ children, textValue, isRtl }) {
  const labelStyle = isRtl ? styles.rtlTextStyle : null;
  return (
    <View
      style={[
        flexStyle,
        verticalCenteredFlex,
        shadowStyle,
        styles.sectionStyle
      ]}
    >
      {Text({
        children: textValue,
        style: [styles.textStyle, labelStyle]
      })}

      {children}
    </View>
  );
}

function actionsDispatcher(dispatch) {
  return {
    handleChangeLoc: lang => dispatch(setLocalization(lang)),
    handleChangeCountry: value => dispatch(setCountry(value))
  };
}

export default connector({
  langProps: ["ENG", "ARAB", "SLCTCNTRY", "DONE", "COUNTRY", "COUNTRYRESD"],
  actionsDispatcher,
  setCountry: true
})(ChangeLocalizationView);
