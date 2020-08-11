import React from "react";
import { ImageBackground, Dimensions, StyleSheet, View } from "react-native";
import connector from "../connector";
const { height: deviceHeight, width: deviceWidth } = Dimensions.get("screen");
const bgImag = require("../../../assets/images/auth/origin.png");

const { lazy, Suspense } = React;
const ViewWithLogo = lazy(() => import("./ViewWithLogo"));

export default function({ langProps, renderTextsProps }) {
  return function(WrappedComponent) {
    function CreatePageWithBkImg(props) {
      const { lang } = props;

      const textItems =
        renderTextsProps &&
        lang &&
        renderTextsProps.map(({ valueLangName, ...otherProps }) => {
          return {
            ...otherProps,
            value: lang[valueLangName]
          };
        });

      return (
        <ImageBackground source={bgImag} style={styles.bgContainerStyle}>
          {textItems && (
            <Suspense fallback={<View />}>
              <ViewWithLogo textItems={textItems} />
            </Suspense>
          )}

          {WrappedComponent && <WrappedComponent {...props} />}
        </ImageBackground>
      );
    }

    return connector({
      langProps
    })(CreatePageWithBkImg);
  };
}

const styles = StyleSheet.create({
  bgContainerStyle: {
    width: deviceWidth,
    height: deviceHeight
  }
});
