import SearchListHoc from "../../components/SearchListHoc";

export default SearchListHoc(
  function({ children }) {
    return children;
  },
  {
    apiName: "getDocs",
    valuePropName: "name"
  }
);
