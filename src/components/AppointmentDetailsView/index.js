import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import styles from "./styles";
import RenderHeaderView from "./FirstSectionView";
import RenderBodyView from "./BodyView";
import PageLastButton from "../PageLastButton";

const { Fragment } = React;
const { height: devHeight } = Dimensions.get("screen");

function AppointmentDetailsView({
  isRtl,
  buttonTitle,
  handleGoBack,
  headerText,
  headerLastText,
  appointmentData,
  selectionView,
  headIconName,
  scrollEnabled,
  onPresspageButton
}) {
  const { reservationId } = appointmentData;
  return (
    <Fragment>
      <ScrollView
        style={styles.containerStyle}
        shouldRasterizeIOS
        scrollEnabled={scrollEnabled || devHeight <= 500}
      >
        {RenderHeaderView({
          handleGoBack,
          headerLastText,
          headerText,
          innerViewStyle: styles.centeredWrapperStyle,
          isRtl,
          reservationId,
          headIconName
        })}

        <View
          style={[
            styles.centeredWrapperStyle,
            styles.detailsWrapperStyle,
            headIconName && styles.detailsWrapperWidthIconStyle
          ]}
        >
          {RenderBodyView({
            appointmentData,
            isRtl
          })}
        </View>

        {selectionView && (
          <View style={styles.selectionViewStyle}>{selectionView}</View>
        )}
      </ScrollView>

      {Boolean(buttonTitle) &&
        PageLastButton({
          title: buttonTitle,
          onPress: onPresspageButton
        })}
    </Fragment>
  );
}

export default AppointmentDetailsView;
