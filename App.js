import React from "react";
import { Provider } from "react-redux";
import AppContainer from "./src/index";
import store from "./src/store";

export default function(props) {
  return (
    <Provider store={store}>
      <AppContainer {...props} />
    </Provider>
  );
}
