import { StyleSheet } from "react-native";
import ViewSectionsItem from "../HeroViewSections";
import SelectionGroup from "../SelectionGroup";
import { colors } from "../../utilities/theme";

function TimeSlotComponent({ items, headerValue }) {
  const isValueString = typeof items === "string";

  return ViewSectionsItem({
    containerStyle: styles.optionsContainerStyle,
    options: [
      {
        value: headerValue,
        txtStyle: styles.headerTxtStyle,
        style: styles.optionItemStyle,
        centerText: false
      },
      {
        value: isValueString
          ? items
          : SelectionGroup({
              items,
              onSelect: undefined,
              itemContainerStyle: styles.selectionItemStyle
            }),
        ...(isValueString
          ? {
              centerText: true,
              txtStyle: styles.bodyTxtStyle
            }
          : null),
        style: [styles.bodyOptionStyle, isValueString && styles.bodyOptionWidth]
      }
    ]
  });
}

const styles = StyleSheet.create({
  optionsContainerStyle: {
    minHeight: 100
  },
  headerTxtStyle: {
    color: "#006fc1"
  },
  optionItemStyle: {
    paddingHorizontal: 20
  },
  bodyOptionStyle: {
    marginVertical: 8,
    minHeight: 25
  },
  bodyOptionWidth: {
    width: "80%",
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "center"
  },
  bodyTxtStyle: {
    color: colors.appPrimary,
    fontSize: 14
  },
  selectionItemStyle: {
    width: 70
  }
});

export default TimeSlotComponent;
