import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../../utilities/theme";
import Loader from "../../../components/AsyncAwaiter";

const { Fragment, Suspense, lazy } = React;
const AppointmentItemView = lazy(() =>
  import("../../Appointments/AppointmentItemView")
);
const Text = lazy(() => import("../../../components/Text"));
const FavsView = lazy(() => import("./favItems"));
const RecentView = lazy(() => import("./recentlViewed"));

const loaderView = Loader({ isLoading: true });

function MainHomeView({
  seeMoreText,
  isRtl,
  onPressLoadMore,
  navigate,
  upcomingAppoitments: { isLoading, data }
}) {
  const isMoreThanTowAppoints = Array.isArray(data) && data.length > 2;
  const appointsDataArr = isMoreThanTowAppoints ? [data[0], data[1]] : data;

  function handlePressItem(id, index) {
    return navigate("Appointment Details", { data: data[index] });
  }

  function onPressDoctorItem(id) {
    return navigate("DoctorProfile", {
      id
    });
  }

  return (
    <Fragment>
      <View style={styles.appointsContainerStyle}>
        {!isLoading && appointsDataArr && (
          <Suspense fallback={loaderView}>
            {appointsDataArr &&
              appointsDataArr.map((item, idx) => (
                <AppointmentItemView
                  key={item.id}
                  smallView
                  isRtl={isRtl}
                  onPress={handlePressItem}
                  index={idx}
                  {...item}
                />
              ))}

            {isMoreThanTowAppoints && (
              <Text
                style={styles.seeMoreText}
                children={seeMoreText}
                onPress={onPressLoadMore}
              />
            )}
          </Suspense>
        )}
      </View>

      <Suspense fallback={loaderView}>
        <FavsView onPressDoctorItem={onPressDoctorItem} />
        <RecentView onPressDoctorItem={onPressDoctorItem} />
      </Suspense>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  appointsContainerStyle: {
    height: 195,
    position: "relative",
    top: 12,
    right: 12,
    minWidth: "95%",
    marginHorizontal: 12
  },
  seeMoreText: {
    color: colors.appPrimary,
    height: 19,
    textAlign: "center",
    fontSize: 15
  }
});

export default MainHomeView;
