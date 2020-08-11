import React from "react";
import PageWithSearchHeader from "../SearchPageWrapper";
import connecter from "../connector";
import { doctorsList } from "../../utilities/data";
import Loader from "../AsyncAwaiter";

const fallback = Loader({ isLoading: true });

const { useState, Suspense, lazy } = React;
const ListView = lazy(() => import("./ListViewItems"));

export default (
  WrappedComponent,
  { localizationName = "SEARCHDOC", apiName, valuePropName = "name" }
) => {
  function WithListHoc({ isRtl, lang, navigation }) {
    const [stateValues, setStateValues] = useState({
      searchValue: undefined,
      isLoading: false,
      selectedItem: undefined,
      searchDataList: undefined
    });

    const {
      isLoading,
      searchValue,
      selectedItem,
      searchDataList
    } = stateValues;

    function handleChange(value) {
      setStateValues({
        ...stateValues,
        searchValue: value
      });
    }

    function fetchSearchData() {
      setStateValues({
        ...stateValues,
        isLoading: true
      });
      setTimeout(() => {
        setStateValues({
          ...stateValues,
          isLoading: false,
          searchDataList: doctorsList
        });
      }, 200);
    }

    function onPressItem({ id, name }) {
      setStateValues({
        ...stateValues,
        searchValue: name,
        selectedItem: id
      });
      const routeName = valuePropName !== "insurance" ? "Search" : "Filter";
      return navigation.navigate(routeName, {
        [valuePropName]: name
      });
    }

    return WrappedComponent({
      navigation,
      children: PageWithSearchHeader({
        value: searchValue,
        isRtl,
        onPressSearchIcon: fetchSearchData,
        onChangeText: handleChange,
        showLoadingIcon: isLoading,
        placeholder: lang && lang[localizationName],
        children: !isLoading && searchDataList && (
          <Suspense fallback={fallback}>
            <ListView
              data={searchDataList}
              isRtl={isRtl}
              onPress={onPressItem}
              selectedItem={selectedItem}
            />
          </Suspense>
        )
      })
    });
  }

  return connecter({
    langProps: [localizationName]
  })(WithListHoc);
};
