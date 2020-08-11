import React from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import { registeredStyles } from "../../utilities/theme";
import styles from "./styles";
import Indicator from "./base";

export default class WaveIndicator extends React.PureComponent {
  static defaultProps = {
    animationEasing: Easing.out(Easing.ease),
    animationDuration: 1600,

    waveFactor: 0.54,
    waveMode: "fill",

    color: "rgb(0, 0, 0)",
    count: 4,
    size: 40
  };

  constructor(props) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, count, progress }) {
    const { size, color, waveFactor, waveMode } = this.props;
    const fill = "fill" === waveMode;
    const scaleValue = progress.interpolate({
      inputRange: [0, 1 - Math.pow(waveFactor, !index ? 0.000001 : index), 1],
      outputRange: [0, 0, 1]
    });

    const waveStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderWidth: fill ? 0 : Math.floor(size / 20),
      [fill ? "backgroundColor" : "borderColor"]: color,
      transform: [
        {
          scale: scaleValue
        }
      ],
      opacity: progress.interpolate({
        inputRange: [0, 1 - Math.pow(waveFactor, index), 1],
        outputRange: [1, 1, 0]
      })
    };

    return (
      <Animated.View
        style={[
          styles.layer,
          registeredStyles.horizontalCenteredFlex,
          registeredStyles.verticalCenteredFlex
        ]}
        {...{ key: index }}
      >
        <Animated.View style={waveStyle} />
      </Animated.View>
    );
  }

  render() {
    const { style, size, ...props } = this.props;

    const indecatorStyle = StyleSheet.create({
      indeSyle: {
        width: size,
        height: size
      }
    });

    return (
      <View
        style={[
          registeredStyles.flexStyle,
          registeredStyles.horizontalCenteredFlex,
          registeredStyles.verticalCenteredFlex,
          style
        ]}
      >
        <Indicator
          style={indecatorStyle.indeSyle}
          renderComponent={this.renderComponent}
          {...props}
        />
      </View>
    );
  }
}
