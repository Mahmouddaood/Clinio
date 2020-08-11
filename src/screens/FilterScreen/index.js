import React from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import connecter from "../../components/connector";
import HeroPage from "../../components/HeroPage";
import { registeredStyles } from "../../utilities/theme";
import Text from "../../components/Text";
import ViewItem from "../../components/HeroViewSections";
import renderInputItem from "../Home/selectorsView/ItemInput";

function FilterScreen({ isRtl, lang, navigation: { navigate, getParam } }) {
  const insuranceValue = getParam("insurance");

  function navigateTo(routeName) {
    return function() {
      return navigate(routeName);
    };
  }

  return (
    <HeroPage>
      <ScrollView style={styles.containerStyle}>
        <ViewItem
          containerStyle={styles.viewItemContainerStyle}
          options={[
            {
              value: lang && lang.INSUPROV
            },
            {
              value: renderInputItem({
                title: lang && lang.INSUPROV,
                value: insuranceValue ? insuranceValue : undefined,
                isRtl
              }),
              onPress: navigateTo("Select Insurance")
            }
          ]}
        />
      </ScrollView>
    </HeroPage>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    minWidth: "93%",
    marginHorizontal: 12,
    top: 35
  },
  viewItemContainerStyle: {
    marginBottom: 12,
    marginHorizontal: 12,
    elevation: 0.5,
    height: 102
  }
});

export default connecter({
  langProps: ["INSUPROV"]
})(FilterScreen);
