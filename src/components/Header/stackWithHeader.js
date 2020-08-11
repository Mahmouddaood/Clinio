import React from "react";
import { createStackNavigator } from "react-navigation";
import Header from "./index";

function renderAppHeader(useBackIcon) {
  return function(props) {
    return <Header useBackIcon={useBackIcon} {...props} />;
  };
}

export function createStack({
  screenComponent,
  screenName,
  withHeader = true,
  useBackIcon = true,
  stacks,
  routeConfig
}) {
  const values = !stacks
    ? {
        [screenName]: {
          screen: screenComponent,
          navigationOptions: {
            header: withHeader ? renderAppHeader(useBackIcon) : null
          }
        }
      }
    : stacks;

  return createStackNavigator(values, routeConfig);
}

export function renderStacks(stacksArr) {
  let stacks = {};
  stacksArr.forEach(screen => {
    const { screenName } = screen;
    stacks = {
      ...stacks,
      [screenName]: createStack({
        ...screen
      })
    };
  });

  return stacks;
}
