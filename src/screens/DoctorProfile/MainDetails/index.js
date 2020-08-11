import React from "react";
import { View, TouchableHighlight } from "react-native";
import styles from "./styles";
import { colors, registeredStyles } from "../../../utilities/theme";
import Text from "../../../components/Text";
import Avatar from "../../../components/Avatar";
import Icon from "../../../components/Icon";
import Rating from "../../../components/Rating";
import renderIconWithText from "../../Favorites/IconWithText";

const {
  shadowStyle,
  flexStyle,
  selfCentered,
  verticalCenteredFlex,
  spaceBetweenItems,
  horizontalCenteredFlex,
  rowStyle
} = registeredStyles;

function MainDetails({
  data,
  onPressFav = undefined,
  onPressReviews,
  langData
}) {
  return (
    <View style={[shadowStyle, styles.profileFSection]}>
      {Avatar({
        source: { uri: data.image },
        xxlarge: true,
        useBorder: true,
        borderWidth: 2,
        containerStyle: [styles.docImgStyle, shadowStyle, selfCentered]
      })}

      {Icon({
        name: data.is_fav ? "favorite" : "favorite-border",
        onPress: onPressFav,
        color: colors.appPrimary,
        size: 28,
        containerStyle: styles.favIconStyle
      })}

      <View style={[flexStyle, styles.docDetailsWrapperStyle]}>
        {Text({
          center: true,
          children: data.name,
          style: [styles.docNameStyle, selfCentered]
        })}

        {Text({
          center: true,
          children: data.speciality,
          style: [styles.specStyle, selfCentered]
        })}

        {Rating({
          rating: data.rates,
          style: selfCentered
        })}

        <TouchableHighlight
          underlayColor="transparent"
          style={[styles.buttonContainer, selfCentered, verticalCenteredFlex]}
          onPress={onPressReviews}
        >
          {Text({
            center: true,
            children: langData && langData.buttonText,
            style: styles.buttonTextStyle
          })}
        </TouchableHighlight>

        <View
          style={[
            rowStyle,
            spaceBetweenItems,
            horizontalCenteredFlex,
            styles.locfessContainer
          ]}
        >
          {[0, 1, 2].map(item =>
            renderIconWithText({
              title: !item
                ? langData && langData.FEES
                : item === 1
                ? langData && langData.WAITTIME
                : langData && langData.LOCATION,
              value: !item
                ? data.fees
                : item === 1
                ? data.waitingTime
                : data.location,
              containerStyle: styles.iconTextStyle,
              useTitleLargeFontSize: true
            })
          )}
        </View>

        {Text({
          children: data.aboutDoctor,
          style: styles.aboutDocTextStyle,
          center: true
        })}

        {Text({
          children: data.address,
          style: [styles.addressTextStyle, selfCentered],
          center: true
        })}
      </View>
    </View>
  );
}

export default MainDetails;
