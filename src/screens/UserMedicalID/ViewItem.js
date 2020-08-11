import React from "react";
import { View, StyleSheet } from "react-native";
import { registeredStyles, colors } from "../../utilities/theme";
import Text from "../../components/Text";

function renderViewItem({ value = "-", label, children, style }) {
  return (
    <View style={[registeredStyles.shadowStyle, styles.itemStyle, style]}>
      <View style={styles.headerStyle}>
        {Text({
          children: value,
          style: [styles.valueTextStyle, styles.textStyle]
        })}

        {Text({
          children: label,
          style: [styles.textStyle, styles.labelStyle]
        })}
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    height: 135,
    borderRadius: 8,
    paddingTop: 12,
    paddingHorizontal: 15,
    marginBottom: 15
  },
  headerStyle: {
    marginBottom: 15
  },
  valueTextStyle: {
    minHeight: 28,
    fontSize: 20,
    color: colors.appPrimary
  },
  textStyle: {
    fontFamily: "Montserrat-Regular"
  },
  labelStyle: {
    writingDirection: "rtl",
    fontSize: 12,
    minHeight: 15,
    color: colors.placeholder
  }
});

export default renderViewItem;
