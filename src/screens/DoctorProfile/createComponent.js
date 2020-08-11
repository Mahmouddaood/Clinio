import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../components/Text";
import ViewSectionsItem from "../../components/HeroViewSections";
import { colors, registeredStyles } from "../../utilities/theme";

const { rowStyle, verticalCenteredFlex } = registeredStyles;

export default function(WrappedComponent) {
  return function createComponent(props) {
    const { bodyItems, headerValue } = props;

    return WrappedComponent({
      ...props,
      children: ViewSectionsItem({
        containerStyle: styles.optionsContainerStyle,
        options: [
          {
            value: headerValue,
            txtStyle: styles.headerTxtStyle,
            style: styles.optionItemStyle,
            centerText: false
          },
          {
            style: styles.optionItemStyle,
            value: renderBodyView({ bodyItems })
          }
        ]
      })
    });
  };
}

function renderBodyView({ bodyItems }) {
  if (!bodyItems) return null;
  else {
    const isValueString = typeof bodyItems === "string";
    return (
      <View style={[rowStyle, styles.bodyViewStyle]}>
        {isValueString
          ? itemView({ value: bodyItems })
          : bodyItems.map(value => itemView({ value }))}
      </View>
    );
  }
}

function itemView({ value }) {
  return (
    <View key={value} style={[styles.itemViewStyle, verticalCenteredFlex]}>
      {Text({
        children: value,
        style: styles.itemTxtStyle,
        center: true
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  itemViewStyle: {
    minWidth: 45,
    minHeight: 24,
    borderRadius: 21,
    paddingHorizontal: 10,
    backgroundColor: colors.appPrimary,
    marginBottom: 6,
    marginRight: 5
  },
  itemTxtStyle: {
    height: 15,
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.white
  },
  optionsContainerStyle: {
    minHeight: 154
  },
  headerTxtStyle: {
    color: colors.appPrimary
  },
  optionItemStyle: {
    paddingHorizontal: 20
  },
  bodyViewStyle: {
    flexWrap: "wrap",
    paddingVertical: 10
  }
});
