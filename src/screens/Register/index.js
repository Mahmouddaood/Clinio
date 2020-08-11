import React from "react";
import { View, StyleSheet } from "react-native";
import { registeredStyles } from "../../utilities/theme";
import AuthContainer from "../../components/AuthContainerHoc";
import Input from "../../components/Input";
import PhoneInput from "../../components/PhonePicker";
import {
  getLocation,
  requestLocationPermission
} from "../../utilities/locationHelper/accessLocation";

import GeoCoder from "../../utilities/locationHelper/geoCoder";

const { useState, useEffect, Fragment } = React;
const { rowStyle, spaceBetweenItems, selfCentered, rtlRow } = registeredStyles;

function RegisterScreen({ navigation: { navigate } }) {
  const [state, updateState] = useState({
    fName: undefined,
    lName: undefined,
    email: undefined,
    pass: undefined,
    pass_confirm: undefined,
    isLocationFieldEditable: false,
    isReady: true,
    city: undefined,
    phone: undefined
  });

  const {
    email,
    fName,
    isLocationFieldEditable,
    isReady,
    lName,
    pass,
    pass_confirm,
    city,
    phone
  } = state;

  useEffect(() => {
    onScreenRender();
  }, [state]);

  function onScreenRender() {
    if (isReady) {
      requestLocationPermission({
        onStart: function() {
          updateState({ ...state, isReady: false });
        },
        onPermision: {
          onDenied: function() {
            updateState({ ...state, isReady: false });
          },
          onGranted: function() {
            updateState({
              ...state,
              isReady: false,
              isLocationFieldEditable: false
            });
            getLocation(getLocationSuccess);
          }
        }
      });
    }
  }

  function handleChange(name) {
    return function(value) {
      return updateState({
        ...state,
        [name]: value
      });
    };
  }

  function onPressLinkText() {
    return navigate("Login");
  }

  async function getLocationSuccess({ coords: { latitude, longitude } }) {
    const myApiKey = "AIzaSyAyjChZK8iKb3WyBT5N4MXhEXFJvn1gh94";
    if (Number(latitude) && Number(longitude)) {
      await fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          latitude +
          "," +
          longitude +
          "&key=" +
          myApiKey
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(
            "ADDRESS GEOCODE is BACK!! => " +
              responseJson.results[1].formatted_address
          );
        });
    }
  }

  function onPressButton() {
    return navigate("Verification", {
      phone: "01024079899",
      name: `${fName}  ${lName}`
    });
  }

  return (
    <AuthContainer
      buttonDisabled={false}
      onPressButton={onPressButton}
      onPressLinkText={onPressLinkText}
      childrenContainerStyle={styles.containerViewStyle}
    >
      {({ lang, isRtl, textRight, iso2 }) => (
        <Fragment>
          <View
            style={[
              rowStyle,
              spaceBetweenItems,
              styles.rowFieldsStyle,
              selfCentered
            ]}
          >
            {Input({
              isRTL: isRtl,
              value: fName,
              style: styles.fieldInRowStyle,
              placeholder: lang && lang.FRSTNAME,
              onChange: handleChange("fName")
            })}

            {Input({
              isRTL: isRtl,
              value: lName,
              style: styles.fieldInRowStyle,
              placeholder: lang && lang.LASTNAME,
              onChange: handleChange("lName")
            })}
          </View>

          {Input({
            isRTL: isRtl,
            value: email,
            placeholder: lang && lang.EMAILADDRESS,
            keyboardType: "email-address",
            returnKeyType: "next",
            onChange: handleChange("email")
          })}

          <PhoneInput
            initialCountry={iso2}
            isRtl={isRtl}
            rtlStyle={isRtl && rtlRow}
            onChange={handleChange("phone")}
          />

          {Input({
            isRTL: isRtl,
            value: pass,
            style: isRtl && textRight,
            placeholder: lang && lang.PASS,
            secureTextEntry: true,
            onChange: handleChange("pass")
          })}

          {Input({
            isRTL: isRtl,
            value: pass_confirm,
            style: isRtl && textRight,
            placeholder: lang && lang.CONFPASS,
            secureTextEntry: true,
            onChange: handleChange("pass_confirm")
          })}

          {Input({
            isRTL: isRtl,
            value: city,
            editable: isLocationFieldEditable,
            placeholder: lang && lang.CITY,
            onChange: handleChange("city")
          })}
        </Fragment>
      )}
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  containerViewStyle: {
    minHeight: 200,
    marginVertical: 12
  },
  rowFieldsStyle: {
    maxHeight: 50,
    minWidth: "92%",
    width: "92%",
    margin: "auto"
  },
  fieldInRowStyle: {
    minWidth: "44%",
    marginHorizontal: 0
  }
});

export default RegisterScreen;
