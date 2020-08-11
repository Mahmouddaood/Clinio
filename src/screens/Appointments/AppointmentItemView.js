import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { registeredStyles } from "../../utilities/theme";
import Avatar from "../../components/Avatar";
import Text from "../../components/Text";

const {
  shadowStyle,
  flexStyle,
  verticalCenteredFlex,
  selfCentered,
  spaceBetweenItems,
  horizontalCenteredFlex,
  rtlRow,
  rowStyle
} = registeredStyles;

function AppointmentItemView({
  isRtl,
  image,
  name,
  speciality,
  time,
  date,
  address,
  status,
  smallView = false,
  id,
  index,
  onPress,
  containerViewStyle,
  innerViewStyle,
  rightComponent
}) {
  const shouldShowStatus = Boolean(status) && !smallView;
  const viewRowStyle = isRtl ? rtlRow : rowStyle;

  function handlePress() {
    return onPress && onPress(id, index);
  }

  const WrapperComponent = onPress ? TouchableOpacity : View;
  return (
    <WrapperComponent
      style={[
        shadowStyle,
        styles.containerStyle,
        flexStyle,
        smallView && styles.containerSmallViewStyle,
        verticalCenteredFlex,
        containerViewStyle
      ]}
      {...(onPress ? { onPress: handlePress } : null)}
    >
      <View
        style={[
          styles.innerWrapper,
          selfCentered,
          smallView && styles.innerSmallStyle,
          innerViewStyle
        ]}
      >
        <View
          style={[
            viewRowStyle,
            spaceBetweenItems,
            smallView && horizontalCenteredFlex
          ]}
        >
          {Avatar({
            containerStyle: styles.avatarContainerStyle,
            avatarStyle: styles.avatarStyle,
            source: { uri: image }
          })}
          <View
            style={[
              flexStyle,
              viewRowStyle,
              spaceBetweenItems,
              smallView && horizontalCenteredFlex,
              styles.detailsContainer,
              smallView && styles.detailsSmallStyle
            ]}
          >
            <View style={styles.nameSpecAddressContainer}>
              {Text({
                children: name,
                style: [styles.docNameStyle, isRtl && styles.rtlTextStyle]
              })}
              {Text({
                children: speciality,
                style: [styles.specStyle, isRtl && styles.rtlTextStyle]
              })}

              {!smallView &&
                Text({
                  children: address,
                  style: [styles.addressStyle, isRtl && styles.rtlTextStyle]
                })}
            </View>

            <View style={[shouldShowStatus && spaceBetweenItems]}>
              {rightComponent ? (
                rightComponent
              ) : (
                <View>
                  {Text({
                    children: time,
                    style: [styles.timeTextStyle, isRtl && styles.rtlTextStyle]
                  })}
                  {Text({
                    children: date,
                    style: [styles.dateTextStyle, isRtl && styles.rtlTextStyle]
                  })}
                </View>
              )}

              {shouldShowStatus && (
                <View
                  style={[
                    styles.statusContainerStyle,
                    status === "done" && styles.doneStatus,
                    status === "cancled" && styles.cancledStatus
                  ]}
                >
                  {Text({
                    children: status,
                    center: true,
                    style: [styles.statusTxtStyle, isRtl && styles.rtlTextStyle]
                  })}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </WrapperComponent>
  );
}

export default AppointmentItemView;
