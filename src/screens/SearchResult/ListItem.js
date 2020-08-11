import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { registeredStyles, colors } from "../../utilities/theme";
import AppointmentItem from "../../screens/Appointments/AppointmentItemView";
import Rating from "../../components/Rating";
import Text from "../../components/Text";
import Icon from "../../components/Icon";
import RoundedStaticSwitcher from "../../components/RoundedStaticSwitcher";

function ListItem({
  name,
  image,
  speciality,
  rates,
  aboutDoctor,
  fees,
  address,
  waitingTime,
  availability,
  id,
  isRtl,
  langValues,
  onPress,
  onPressbooking
}) {
  const switcherOptions = [
    {
      centerText: false,
      containerStyle: styles.availabityContainer,
      label: availability,
      textStyle: styles.availabityText
    },
    {
      label: "Book"
    }
  ];

  return (
    <View style={[styles.conatinerStyle, registeredStyles.shadowStyle]}>
      {AppointmentItem({
        isRtl,
        id,
        speciality,
        name,
        image,
        smallView: true,
        containerViewStyle: styles.appointItemViewStyle,
        innerViewStyle: styles.appointInnerViewStyle,
        onPress,
        rightComponent: Rating({
          rating: rates,
          style: styles.ratingStyle
        })
      })}
      <View style={[styles.contentStyle, isRtl && styles.rtlContentStyle]}>
        {Text({
          children: aboutDoctor,
          style: [styles.aboutDoctorStyle, isRtl && styles.rtlTextStyle]
        })}

        {RowIconWithText({
          isRtl,
          langText: langValues && langValues[0],
          textValue: fees
        })}

        {RowIconWithText({
          isRtl,
          textValue: address
        })}

        {RowIconWithText({
          isRtl,
          langText: langValues && langValues[1],
          textValue: waitingTime
        })}
      </View>

      {RoundedStaticSwitcher({
        isRtl,
        options: switcherOptions,
        onPress: onPressbooking
      })}
    </View>
  );
}

function RowIconWithText({
  isRtl,
  iconName = "location-pin",
  textValue,
  langText
}) {
  return (
    <View style={[isRtl ? registeredStyles.rtlRow : registeredStyles.rowStyle]}>
      {Icon({
        name: iconName,
        iconStyle: [styles.iconStyle, isRtl && styles.rtlIconStyle],
        color: colors.appPrimary,
        type: "simple-line-icon",
        size: 15
      })}

      {Text({
        children: `${langText ? `${langText}: ` : ""} ${textValue}`,
        style: [
          styles.aboutDoctorStyle,
          styles.otherTextStyle,
          isRtl && styles.rtlTextStyle
        ]
      })}
    </View>
  );
}

export default ListItem;
