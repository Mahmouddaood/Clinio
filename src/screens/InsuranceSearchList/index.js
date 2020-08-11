import SearchListHoc from "../../components/SearchListHoc";

export default SearchListHoc(
  function({ children }) {
    return children;
  },
  {
    apiName: "getInsurance",
    localizationName: "INSUPROV",
    valuePropName: "insurance"
  }
);
