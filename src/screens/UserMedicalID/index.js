import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import connector from "../../components/connector";
import { colors } from "../../utilities/theme";
import HeroPage from "../../components/HeroPage";
import ViewItem from "./ViewItem";
import Text from "../../components/Text";
import DatePicker from "../../components/DatePicker";
import DashedSlider from "../../components/DashedSlider";
import SelectionGroup from "../../components/SelectionGroup";
import PageLastButton from "../../components/PageLastButton";

function UserMedicalID({ lang, isRtl, navigation: { navigate } }) {
  function onPressSave() {
    return navigate("App");
  }

  return (
    <HeroPage>
      <ScrollView shouldRasterizeIOS showsVerticalScrollIndicator={false}>
        <View style={styles.contentViewStyle}>
          {ViewItem({
            label: lang && lang.BIRTH,
            children: DatePicker({ isRtl })
          })}

          {ViewItem({
            label: lang && lang.WEIGHT,
            style: styles.weightItemStyle,
            children: (
              <DashedSlider minStep={60} maxStep={100} stepBy={1} value={85} />
            )
          })}

          {ViewItem({
            label: lang && lang.HEIGHT,
            style: styles.weightItemStyle,
            children: (
              <DashedSlider minStep={60} maxStep={100} stepBy={1} value={85} />
            )
          })}

          {ViewItem({
            label: lang && lang.GENDER,
            value: lang.GENDERFM,
            children: SelectionGroup({
              items: lang && [lang.GENDERML, lang.GENDERFM],
              selectedItem: lang.GENDERFM,
              onSelect: item => item
            })
          })}

          {ViewItem({
            label: lang && lang.BLOOD,
            value: "O+",
            children: SelectionGroup({
              items: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
              selectedItem: "O+",
              onSelect: item => item
            })
          })}

          {Text({
            children: lang && lang.VITALSIGNS,
            style: styles.SectionTextStyle
          })}

          <ViewItem
            label={lang && `${lang.BDY} ${lang.TEMP}`}
            style={styles.vitalBloodContainerStyle}
          >
            {Text({
              children: lang && lang.SYSTOLICPRESURE,
              style: [styles.SectionTextStyle, styles.bloodPressureTextStyle]
            })}
            <DashedSlider minStep={25} maxStep={50} stepBy={1} value={30} />

            {Text({
              children: lang && lang.DIASTOLICPRESURE,
              style: [styles.SectionTextStyle, styles.bloodPressureTextStyle]
            })}
            <DashedSlider minStep={25} maxStep={50} stepBy={1} value={30} />
          </ViewItem>

          {ViewItem({
            label: lang && lang.GLUCOSETST,
            style: styles.weightItemStyle,
            children: (
              <DashedSlider minStep={20} maxStep={40} stepBy={1} value={25} />
            )
          })}

          {Text({
            children: lang && lang.OTHERS,
            style: styles.SectionTextStyle
          })}

          {ViewItem({
            label: lang && lang.ALERGIES,
            style: styles.weightItemStyle,
            children: (
              <DashedSlider minStep={20} maxStep={40} stepBy={1} value={25} />
            )
          })}

          {ViewItem({
            label: lang && lang.MEDICATION,
            style: styles.weightItemStyle,
            children: (
              <DashedSlider minStep={20} maxStep={40} stepBy={1} value={25} />
            )
          })}

          {ViewItem({
            label: lang && lang.BLOODTRANS,
            value: lang.YES,
            children: SelectionGroup({
              items: lang && [lang.YES, lang.NO],
              selectedItem: lang.YES,
              onSelect: item => item
            })
          })}
        </View>
        {PageLastButton({
          title: lang && lang.SAVE,
          removePosStyle: true,
          disabled: false,
          onPress: onPressSave
        })}
      </ScrollView>
    </HeroPage>
  );
}

const styles = StyleSheet.create({
  contentViewStyle: {
    top: 30,
    minWidth: "95%",
    marginHorizontal: 12,
    marginBottom: 35,
    flex: 1
  },
  weightItemStyle: {
    height: 155
  },
  SectionTextStyle: {
    height: 19,
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
    color: colors.appPrimary,
    marginBottom: 13,
    marginTop: 3
  },
  bloodPressureTextStyle: {
    textAlign: "right",
    marginTop: 3,
    marginBottom: 0,
    height: 14,
    fontSize: 11,
    color: colors.placeholder
  },
  vitalBloodContainerStyle: {
    height: 280
  }
});

export default connector({
  langProps: [
    "BIRTH",
    "WEIGHT",
    "HEIGHT",
    "GENDER",
    "GENDERFM",
    "GENDERML",
    "BLOOD",
    "VITALSIGNS",
    "TEMP",
    "BDY",
    "SYSTOLICPRESURE",
    "DIASTOLICPRESURE",
    "GLUCOSETST",
    "OTHERS",
    "ALERGIES",
    "MEDICATION",
    "BLOODTRANS",
    "YES",
    "NO",
    "SAVE"
  ]
})(UserMedicalID);
