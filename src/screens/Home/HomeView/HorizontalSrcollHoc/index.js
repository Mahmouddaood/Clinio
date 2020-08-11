import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { getFavList } from "../../../Favorites/modules/actions";
import Loader from "../../../../components/AsyncAwaiter";
import { colors } from "../../../../utilities/theme";

const { Suspense, lazy, useEffect } = React;

const Text = lazy(() => import("../../../../components/Text"));
const DoctorItemView = lazy(() => import("./itemView"));

export default (WrappedComponent, isFav = true) => {
  function WithScrollHoc({
    values,
    headerValue,
    isRtl,
    fetchData,
    onPressDoctorItem
  }) {
    const { isLoading, dataList } = values;
    const fallback = Loader({ isLoading });

    useEffect(() => {
      handleShouldGetData();
    });

    function handleShouldGetData() {
      if (!dataList) {
        return fetchData();
      }
    }

    const isThereData =
      !isLoading && Array.isArray(dataList) && dataList.length > 0;
    return !isThereData ? null : (
      <WrappedComponent onPressDoctorItem={onPressDoctorItem}>
        <View style={styles.containerViewStyle}>
          <Suspense fallback={fallback}>
            <Text
              style={[styles.headerTxtStyle, isRtl && styles.rtlTextStyle]}
              children={headerValue}
            />

            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              shouldRasterizeIOS
            >
              {dataList.map((item, idx) => (
                <DoctorItemView
                  key={item.id}
                  {...item}
                  shoudMargin={dataList.length - 1 !== idx}
                  onPress={onPressDoctorItem}
                />
              ))}
            </ScrollView>
          </Suspense>
        </View>
      </WrappedComponent>
    );
  }

  function mapStateToProps({ favReducer, langReducer: { lang, langType } }) {
    return {
      values: favReducer,
      isRtl: langType === "ar",
      headerValue: lang && isFav ? lang.FAVORITES : lang.RECENVIEWED
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      fetchData: () => dispatch(getFavList())
    };
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithScrollHoc);
};

const styles = StyleSheet.create({
  containerViewStyle: {
    right: 12,
    minWidth: "95%",
    marginHorizontal: 12,
    height: 212,
    marginTop: 15
  },
  headerTxtStyle: {
    height: 19,
    fontSize: 15,
    color: colors.appPrimary,
    marginBottom: 12
  },
  rtlTextStyle: {
    writingDirection: "rtl",
    alignSelf: "flex-end",
    right: 12
  }
});
