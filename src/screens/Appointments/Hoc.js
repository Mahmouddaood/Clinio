import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { colors } from "../../utilities/theme";
import Loader from "../../components/AsyncAwaiter";
import { getHistoryAppoints, getUpcomingAppoints } from "./modules/actions";

const { Suspense, lazy, useEffect } = React;
const AppointmentItemView = lazy(() => import("./AppointmentItemView"));

export default (WrappedComponent, isUpComingAppoints = true) => {
  function MainView({ isRtl, goFetchData, stateValues, navigation }) {
    const { isLoading, err, data } = stateValues || {};

    useEffect(() => {
      goFetchData();
    });

    const fallback = Loader({ isLoading, error: err });
    function handlePressItem(id, index) {
      return (
        navigation &&
        navigation.navigate("Appointment Details", {
          data: data[index]
        })
      );
    }

    return (
      <WrappedComponent navigation={navigation}>
        {Loader({
          isLoading,
          error: err,
          children: (
            <ScrollView
              shouldRasterizeIOS
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContentStyles}
              style={styles.scrollStyles}
            >
              {!isLoading && data && (
                <Suspense fallback={fallback}>
                  {data.map((item, idx) => (
                    <AppointmentItemView
                      key={item.id}
                      isRtl={isRtl}
                      index={idx}
                      onPress={handlePressItem}
                      {...item}
                    />
                  ))}
                </Suspense>
              )}
            </ScrollView>
          )
        })}
      </WrappedComponent>
    );
  }

  function mapStateToProps({
    langReducer: { langType },
    appointmentsReducer: { upcomingValues, historyValues }
  }) {
    return {
      isRtl: langType === "ar",
      stateValues: isUpComingAppoints ? upcomingValues : historyValues
    };
  }

  function mapDispatchToProps(dispatch) {
    const action = isUpComingAppoints
      ? getUpcomingAppoints
      : getHistoryAppoints;
    return {
      goFetchData: () => dispatch(action())
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainView);
};

const styles = StyleSheet.create({
  scrollStyles: {
    backgroundColor: colors.lightGrey
  },
  scrollContentStyles: {
    minWidth: "92%",
    marginHorizontal: 12,
    paddingVertical: 12
  }
});
