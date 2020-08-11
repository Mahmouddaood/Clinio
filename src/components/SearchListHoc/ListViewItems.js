import React from "react";
import { TouchableHighlight, ScrollView, StyleSheet } from "react-native";
import { colors, registeredStyles } from "../../utilities/theme";
import Text from "../Text";

function ListView({ data = [], isRtl, onPress, selectedItem }) {
  function handleonPress(item) {
    return function() {
      return onPress && onPress(item);
    };
  }

  return (
    <ScrollView
      shouldRasterizeIOS
      contentContainerStyle={styles.contentContainerStyle}
    >
      {data.map(item => {
        const { name, id } = item;
        const isSelected = selectedItem === id;
        return (
          <TouchableHighlight
            underlayColor={colors.whityGrey}
            key={id}
            onPress={handleonPress(item)}
            style={[
              registeredStyles.shadowStyle,
              styles.itemViewStyle,
              registeredStyles.verticalCenteredFlex,
              isSelected && styles.selectedtItemStyle
            ]}
          >
            {Text({
              children: name,
              style: [
                styles.textValueStyle,
                isSelected && styles.selectedTextColor,
                isRtl && styles.rtlTextStyle
              ]
            })}
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 14
  },
  selectedtItemStyle: {
    backgroundColor: colors.appPrimary
  },
  itemViewStyle: {
    minWidth: "92%",
    height: 46,
    borderRadius: 23,
    marginBottom: 5,
    paddingHorizontal: 20,
    backgroundColor: colors.whityGrey,
    elevation: 0.2
  },
  textValueStyle: {
    height: 14,
    fontFamily: "Montserrat-Regular",
    fontSize: 11,
    color: colors.placeholder
  },
  selectedTextColor: {
    color: colors.white
  },
  rtlTextStyle: {
    textAlign: "right",
    writingDirection: "rtl"
  }
});

export default ListView;
