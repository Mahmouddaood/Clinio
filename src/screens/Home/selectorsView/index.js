import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../../utilities/theme";
import Text from "../../../components/Text";
import ItemsView from "./itemsView";

function SelectorsView({ rtlTextStyle, searchText, isFirstSignUp, navigate }) {
  return (
    <View
      style={[
        styles.searchSelectorsContainer,
        isFirstSignUp && styles.containerStyleWithSignUp
      ]}
    >
      {Text({
        style: [styles.searchTextStyle, rtlTextStyle],
        children: searchText
      })}

      <ItemsView withNameSearchSection={false} navigate={navigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSelectorsContainer: {
    top: 5,
    minHeight: 400,
    right: 12,
    minWidth: "92%",
    marginHorizontal: 14
  },
  containerStyleWithSignUp: {
    top: 50,
    minHeight: 440
  },
  searchTextStyle: {
    color: colors.appPrimary,
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
    height: 19
  }
});

export default SelectorsView;
