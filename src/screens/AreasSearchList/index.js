import SearchListHoc from "../../components/SearchListHoc";

export default SearchListHoc(
  function({ children }) {
    return children;
  },
  {
    apiName: "getAreas",
    localizationName: "SEARCHAREA",
    valuePropName: "area"
  }
);
