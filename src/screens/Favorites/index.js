import React from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
import HeroPage from "../../components/HeroPage";
import Loader from "../../components/AsyncAwaiter";
import { getFavList } from "./modules/actions";

const { Suspense, lazy, useEffect } = React;
const ListItem = lazy(() => import("./ListView"));
const { height } = Dimensions.get("window");

function Favorites({ fetchFavList, isLoading, dataList, err }) {
  useEffect(() => {
    fetchFavList();
  }, [dataList]);

  const fallback = Loader({ isLoading, error: err });

  return (
    <HeroPage spacerStyle={styles.spacerStyle}>
      <ScrollView
        style={styles.containerStyle}
        shouldRasterizeIOS
        showsVerticalScrollIndicator={false}
      >
        <Suspense fallback={fallback}>
          {!isLoading &&
            dataList &&
            dataList.map(({ id, ...otherData }) => (
              <ListItem key={id} {...otherData} />
            ))}
        </Suspense>
      </ScrollView>
    </HeroPage>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    top: 28,
    maxHeight: height - 170,
    minWidth: "92%",
    marginHorizontal: 12
  },
  spacerStyle: {
    height: 90
  }
});

function mapStateToProps({ favReducer }) {
  return favReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFavList: () => dispatch(getFavList())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
