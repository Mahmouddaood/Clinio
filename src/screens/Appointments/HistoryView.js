import HocView from "./Hoc";

export default HocView(function({ children }) {
  return children;
}, false);
