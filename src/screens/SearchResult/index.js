import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import HeroPage from "../../components/HeroPage";
import Loader from "../../components/AsyncAwaiter";
import { searchResultValues } from "../../utilities/data";
const { Suspense, lazy, useState, useEffect } = React;
const ListItem = lazy(() => import("./ListItem"));

function SearchResult({
  navigation: {
    state: { params },
    navigate
  },
  langValues,
  isRtl
}) {
  const [{ isLoading, data, error }, updateStateHandler] = useState({
    isLoading: false,
    error: undefined,
    data: undefined
  });
  const fallback = Loader({ isLoading: !data });

  useEffect(() => {
    onComponentDidMount();
  }, [params]);

  function onComponentDidMount() {
    updateStateHandler({ isLoading: true, error: undefined, data: undefined });
    return setTimeout(() => {
      // call some api
      updateStateHandler({
        isLoading: false,
        error: undefined,
        data: searchResultValues
      });
    }, 3000);
  }

  function onPressDocItem(id, index) {
    return navigate("DoctorProfile");
  }

  function onPressbooking() {
    return navigate("Book");
  }

  return (
    <HeroPage spacerStyle={styles.spacerStyle}>
      <Loader isLoading={isLoading} error={error}>
        <ScrollView
          shouldRasterizeIOS
          scrollEnabled
          showsVerticalScrollIndicator={false}
          style={styles.conatinerStyle}
        >
          {!isLoading && data && (
            <Suspense fallback={fallback}>
              {data.map(item => (
                <ListItem
                  key={item.id}
                  {...item}
                  langValues={langValues}
                  isRtl={isRtl}
                  onPress={onPressDocItem}
                  onPressbooking={onPressbooking}
                />
              ))}
            </Suspense>
          )}
        </ScrollView>
      </Loader>
    </HeroPage>
  );
}

const styles = StyleSheet.create({
  conatinerStyle: {
    minWidth: "92%",
    marginHorizontal: 12,
    top: 15,
    marginBottom: 15
  },
  spacerStyle: {
    height: 170
  }
});

function mapStateToProps({ langReducer: { langType, lang } }) {
  return {
    isRtl: langType === "ar",
    langValues: lang && [lang.FEES, lang.WAITTIME]
  };
}

export default connect(
  mapStateToProps,
  null
)(SearchResult);
