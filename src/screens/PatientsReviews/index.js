import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import HeroPage from "../../components/HeroPage";
import ViewSectionsItem from "../../components/HeroViewSections";
import Text from "../../components/Text";
import Rating from "../../components/Rating";
import { colors } from "../../utilities/theme";

function PatientsReviews({}) {
  return (
    <HeroPage spacerStyle={styles.spacerStyle}>
      <ScrollView shouldRasterizeIOS style={styles.scrollStyle}>
        {patRevs.map(({ id, patientName, comment, rates, date }) => (
          <ViewSectionsItem
            key={id}
            containerStyle={styles.viewItemStyle}
            options={[
              {
                value: renderRowView({
                  isHead: true,
                  leftValue: patientName,
                  rightValue: rates
                }),
                style: styles.optionItemContainer
              },
              {
                value: renderRowView({
                  leftValue: comment,
                  rightValue: date
                }),
                style: styles.optionItemContainer
              }
            ]}
          />
        ))}
      </ScrollView>
    </HeroPage>
  );
}

function renderRowView({ isHead, leftValue, rightValue }) {
  const canApplyExtraTxt = !isHead && leftValue && leftValue.length > 25;
  return (
    <View style={styles.rowViewStyle}>
      {Text({
        children: leftValue,
        style: [
          styles.leftTxtStyle,
          !isHead && styles.commentStyle,
          canApplyExtraTxt && styles.leftTextAsBdyStyle
        ]
      })}

      {isHead
        ? Rating({
            rating: rightValue
          })
        : Text({
            children: rightValue,
            style: [
              styles.commentStyle,
              canApplyExtraTxt && styles.leftTextAsBdyStyle
            ]
          })}
    </View>
  );
}

const styles = StyleSheet.create({
  spacerStyle: {
    height: 60
  },
  scrollStyle: {
    marginHorizontal: 12,
    minWidth: "90%",
    top: 40
  },
  viewItemStyle: {
    minHeight: 77
  },
  optionItemContainer: {
    minHeight: 38.1
  },
  rowViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
    minWidth: "90%",
    maxWidth: "95%",
    flexWrap: "wrap"
  },
  leftTxtStyle: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: colors.appPrimary
  },
  commentStyle: {
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.placeholder
  },
  leftTextAsBdyStyle: {
    marginBottom: 8,
    minHeight: 18
  }
});

export default PatientsReviews;

const patRevs = [
  {
    patientName: "Ahmed Nassar",
    rates: 4,
    comment: "Very good doctor",
    date: "May, 9 2019",
    id: 1
  },
  {
    patientName: "Samy Nassar",
    rates: 1,
    comment: "not bad doctor",
    date: "May, 8 2019",
    id: 2
  },
  {
    patientName: "Hossam Said",
    rates: 5,
    comment: "Best Doctor",
    date: "May, 3 2019",
    id: 3
  },
  {
    patientName: "Ahmed Nassar",
    rates: 2,
    comment: "some comment for doctor",
    date: "May, 2 2019",
    id: 4
  },
  {
    patientName: "Ahmed Nassar",
    rates: 5,
    comment:
      "The clinic is clean and the waiting period is less than half an hour Dr. Khaled shares the right and useful information about your situation without Overpriced or negligen",
    date: "April, 12 2019",
    id: 5
  }
];
