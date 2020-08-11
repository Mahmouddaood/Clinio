import React from "react";
import { StyleSheet } from "react-native";
import { ads } from "../../utilities/data";
import { registeredStyles, colors } from "../../utilities/theme";
import Avatar from "../../components/Avatar";
import AppSlider from "../../components/SliderIntro";

const { useEffect, useState } = React;

function AdsSlider({ isFirstSignUp }) {
  const [{ isLoading, data }, setSliderValues] = useState({
    isLoading: true,
    data: undefined
  });

  useEffect(() => {
    setTimeout(() => {
      setSliderValues({ isLoading: false, data: ads });
    }, 200);
  }, [isLoading, data]);

  return (
    <AppSlider
      style={[
        registeredStyles.selfCentered,
        registeredStyles.shadowStyle,
        style.container,
        isFirstSignUp && style.extraContainerStyle
      ]}
      paginationContainerStyle={style.paginationStyle}
      paginationDotsStyle={style.paginationDotsStyle}
      slides={data}
      renderItem={renderItem}
    />
  );
}

function renderItem({ image, width }) {
  const avatarStyle = [style.imgStyle, { width }];
  return Avatar({
    source: { uri: image },
    containerStyle: avatarStyle,
    avatarStyle
  });
}

const style = StyleSheet.create({
  imgStyle: {
    borderRadius: 8,
    height: 163,
    overflow: "hidden"
  },
  container: {
    position: "relative",
    top: 18,
    overflow: "hidden",
    right: 12,
    minWidth: "95%",
    marginHorizontal: 12,
    height: 163,
    maxHeight: 163,
    backgroundColor: colors.lightGrey,
    borderRadius: 8
  },
  extraContainerStyle: {
    top: 33
  },
  paginationStyle: {
    bottom: 0,
    left: 12
  },
  paginationDotsStyle: {
    marginLeft: 0,
    justifyContent: "flex-start"
  }
});

export default AdsSlider;
