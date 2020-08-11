import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Text from "../Text";
import { registeredStyles, colors } from "../../utilities/theme";

const {
  shadowStyle,
  rowStyle,
  flexStyle,
  spaceBetweenItems
} = registeredStyles;

function DoctorDetails({ isRtl, data }) {
  const { fees, name, speciality, time, date, address } = data;
  const fessTxt = isRtl ? "الرسوم" : "Fees";

  return (
    <View style={[shadowStyle, styles.containerStyle]}>
      <View style={[flexStyle, styles.innerWrapperStyle]}>
        <View style={[rowStyle, styles.itemRowStyle, spaceBetweenItems]}>
          <View style={styles.docDataFSection}>
            {Text({
              children: name,
              style: styles.doctorNameStyle
            })}

            {Text({
              children: speciality,
              style: styles.specStyle
            })}
          </View>

          <View style={flexStyle}>
            {Text({
              children: time,
              style: styles.timeStyle
            })}

            {Text({
              children: date,
              style: styles.dateStyle
            })}
          </View>
        </View>

        <View style={[rowStyle, styles.itemRowStyle]}>
          <View style={styles.locationContainer}>
            {Text({
              children: address,
              style: styles.addressStyle
            })}
          </View>
        </View>

        <View style={styles.footerStyle}>
          {Text({
            children: `${fessTxt}   ${fees}`,
            style: styles.bigText
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    minHeight: 155,
    borderRadius: 8,
    ...Platform.select({ ios: null, android: { elevation: 2 } })
  },
  innerWrapperStyle: {
    margin: 15,
    marginBottom: 0,
    minWidth: "90%"
  },
  itemRowStyle: {
    minHeight: 45,
    marginBottom: 13
  },
  footerStyle: {
    borderTopWidth: 1.5,
    borderTopColor: colors.whityGrey,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    minHeight: 45
  },
  bigText: {
    height: 30,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: colors.placeholder
  },
  doctorNameStyle: {
    height: 22,
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    fontWeight: "500",
    color: colors.placeholder
  },
  specStyle: {
    height: 17,
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.placeholder
  },
  timeStyle: {
    height: 22,
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
    color: colors.appPrimary,
    textAlign: "right"
  },
  dateStyle: {
    height: 15,
    fontFamily: "Montserrat-Regular",
    fontSize: 10,
    color: colors.placeholder,
    textAlign: "right"
  },
  docDataFSection: {
    flex: 2
  },
  locationContainer: {
    maxWidth: "60%"
  },
  addressStyle: {
    minHeight: 32,
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.appPrimary
  }
});

export default DoctorDetails;
