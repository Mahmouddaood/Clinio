import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "./Text";
import { registeredStyles, colors } from "../utilities/theme";

function SelectionGroup({
  items,
  onSelect,
  selectedItem,
  containerStyle,
  itemContainerStyle
}) {
  const areItemsPresent = Array.isArray(items) && items.length;
  const isTwoItems = areItemsPresent && items.length === 2;
  function handlePress(item) {
    return function() {
      if (item) {
        return onSelect && onSelect(item);
      }
    };
  }

  return (
    <View
      style={[
        registeredStyles.rowStyle,
        styles.containerStyle,
        registeredStyles.horizontalCenteredFlex,
        isTwoItems && styles.spaceArroundStyle,
        containerStyle
      ]}
    >
      {areItemsPresent &&
        items.map((item, idx) => {
          const isSelected = selectedItem && selectedItem === item;
          return (
            <TouchableOpacity
              onPress={handlePress(item)}
              key={item + idx}
              style={[
                styles.itemsContainerStyle,
                isSelected && styles.selectedItem,
                itemContainerStyle
              ]}
            >
              {item &&
                Text({
                  children: item || "",
                  onPress: handlePress(item),
                  style: [
                    styles.textStyle,
                    registeredStyles.selfCentered,
                    isSelected && styles.selectedText
                  ],
                  center: true
                })}
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    minHeight: 25,
    minWidth: "95%",
    marginHorizontal: 12,
    flexWrap: "wrap"
  },
  spaceArroundStyle: {
    justifyContent: "space-around"
  },
  selectedItem: {
    backgroundColor: colors.appPrimary
  },
  textStyle: {
    minHeight: 19,
    fontFamily: "Montserrat-Light",
    fontSize: 15,
    fontWeight: "300",
    color: colors.placeholder
  },
  selectedText: {
    color: colors.white,
    fontFamily: "Montserrat-Medium",
    fontWeight: "500"
  },
  itemsContainerStyle: {
    minHeight: 25,
    paddingHorizontal: 11,
    borderRadius: 22
  }
});

export default SelectionGroup;
