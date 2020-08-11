import SearchListHoc from "../../components/SearchListHoc";

export default SearchListHoc(
  function({ children }) {
    return children;
  },
  {
    apiName: "getCities",
    localizationName: "SEARCHCity",
    valuePropName: "city"
  }
);
