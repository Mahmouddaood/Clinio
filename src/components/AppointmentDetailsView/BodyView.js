import React from "react";
import { View, StyleSheet } from "react-native";
import { registeredStyles, colors } from "../../utilities/theme";
import Loader from "../AsyncAwaiter";

const { Suspense, lazy } = React;
const Text = lazy(() => import("../Text"));
const AppointmentItemView = lazy(() =>
  import("../../screens/Appointments/AppointmentItemView")
);
const RenderMapView = lazy(() => import("./MapView"));

const { flexStyle, shadowStyle } = registeredStyles;
const fallback = Loader({ isLoading: true });

function BodyView({ appointmentData, isRtl }) {
  const { address } = appointmentData;
  return (
    <View style={[styles.contentStyle, shadowStyle]}>
      <View style={[flexStyle, styles.containerWrapperStyle]}>
        <Suspense fallback={fallback}>
          <Text
            children={!isRtl ? "Appointment Details" : "تفاصيل الموعد"}
            style={styles.detailsHeaderTxt}
            applyRtlStyle={isRtl}
          />

          {appointmentData && (
            <AppointmentItemView
              smallView
              isRtl={isRtl}
              containerViewStyle={styles.appointItemViewStyle}
              innerViewStyle={styles.appointInnerViewStyle}
              {...appointmentData}
            />
          )}

          <Text
            children={!isRtl ? "Location Details" : "تفاصيل الموقع"}
            style={styles.detailsHeaderTxt}
            applyRtlStyle={isRtl}
          />

          {address && (
            <Text
              children={address}
              style={styles.addressStyle}
              applyRtlStyle={isRtl}
            />
          )}
          <RenderMapView mapStyle={styles.map} />
        </Suspense>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    borderRadius: 8,
    ...StyleSheet.absoluteFillObject
  },
  containerWrapperStyle: {
    margin: 15
  },
  detailsHeaderTxt: {
    height: 15,
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
    fontWeight: "500",
    color: colors.placeholder
  },
  appointItemViewStyle: {
    elevation: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    borderRadius: 0,
    maxHeight: 65,
    marginTop: 14,
    minHeight: 60
  },
  appointInnerViewStyle: {
    marginHorizontal: 0,
    minHeight: 60,
    width: "96.5%"
  },
  addressStyle: {
    height: 30,
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    fontWeight: "300",
    color: colors.appPrimary,
    marginTop: 6,
    width: 186,
    marginBottom: 6
  },
  map: {
    height: 245
  }
});

export default BodyView;
