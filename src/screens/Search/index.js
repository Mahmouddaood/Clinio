import React from "react";
import { View, StyleSheet } from "react-native";
import connecter from "../../components/connector";
import HeroPage from "../../components/HeroPage";
import AppHeader from "../../components/Header";
import ViewItems from "../Home/selectorsView/itemsView";
import LastPageButton from "../../components/PageLastButton";

const { Fragment } = React;

function Search({ navigation, lang }) {
  const {
    navigate,
    state: { params },
    setParams
  } = navigation;

  const values = getValues(params);

  function onResetParams() {
    return setParams({
      name: undefined,
      spec: undefined,
      area: undefined,
      city: undefined
    });
  }

  function onPressSearch() {
    return navigate("Search Result");
  }

  return (
    <Fragment>
      <AppHeader
        navigation={navigation}
        useBackIcon
        onMomentGoback={onResetParams}
      />
      <HeroPage>
        <View style={styles.containerStyle}>
          <ViewItems
            withNameSearchSection
            navigate={navigate}
            values={values}
            withWrapper={false}
            itemContainerStyle={styles.itemStyle}
          />
        </View>

        {LastPageButton({
          title: lang && lang.SEARCH,
          onPress: onPressSearch
        })}
      </HeroPage>
    </Fragment>
  );
}

function getValues(params) {
  let values = [];
  ["name", "spec", "city", "area"].forEach(item => {
    const value = params && Boolean(params[item]) ? params[item] : "";
    values = [...values, value];
  });

  return values;
}

const styles = StyleSheet.create({
  containerStyle: {
    top: 30,
    minWidth: "92%",
    marginHorizontal: 12
  },
  itemStyle: {
    top: 3,
    height: 105,
    marginHorizontal: 0
  }
});

export default connecter({
  langProps: ["SEARCH"]
})(Search);
