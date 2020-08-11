import SearchListHoc from "../../components/SearchListHoc";

export default SearchListHoc(
  function({ children }) {
    return children;
  },
  {
    apiName: "getSpecs",
    localizationName: "SEARCHSPECS",
    valuePropName: "spec"
  }
);
