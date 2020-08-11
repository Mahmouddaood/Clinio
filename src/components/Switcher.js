import React from "react";
import {
  Animated,
  Easing,
  PanResponder,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import Text from "./Text";
import { registeredStyles, colors } from "../utilities/theme";
const { PureComponent } = React;
const {
  rowStyle,
  verticalCenteredFlex,
  horizontalCenteredFlex,
  flexStyle
} = registeredStyles;

export default class SwitchSelector extends PureComponent {
  constructor(props) {
    super(props);
    const { initial, options } = props;
    this.state = {
      selected: initial ? initial : 0
    };
    this.animatedValue = new Animated.Value(
      initial ? initial / options.length : 0
    );

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.shouldSetResponder,
      onMoveShouldSetPanResponder: this.shouldSetResponder,
      onPanResponderRelease: this.responderEnd,
      onPanResponderTerminate: this.responderEnd
    });
  }

  componentWillReceiveProps({ value: nextValue, initial: nextInitial }) {
    const { value, initial, options } = this.props;
    if (nextValue !== value) {
      this.toggleItem(nextValue);
    }
    if (initial !== nextInitial) {
      this.setState(
        {
          selected: nextInitial
        },
        () => {
          this.animatedValue.setValue(
            nextInitial ? nextInitial / options.length : 0
          );
        }
      );
    }
  }

  shouldSetResponder = (evt, gestureState) => {
    return (
      evt.nativeEvent.touches.length === 1 &&
      !(Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5)
    );
  };

  responderEnd = (evt, gestureState) => {
    const { selected } = this.state;
    const { options, disabled } = this.props;
    if (disabled) return;
    const swipeDirection = this._getSwipeDirection(gestureState);
    if (swipeDirection === "RIGHT" && selected < options.length - 1) {
      this.toggleItem(selected + 1);
    } else if (swipeDirection === "LEFT" && selected > 0) {
      this.toggleItem(selected - 1);
    }
  };

  _getSwipeDirection(gestureState) {
    const { dx, dy, vx } = gestureState;
    // 0.1 velocity
    if (Math.abs(vx) > 0.1 && Math.abs(dy) < 80) {
      return dx > 0 ? "RIGHT" : "LEFT";
    }
    return null;
  }

  getBgColor() {
    const { selected } = this.state;
    const { options, buttonColor } = this.props;
    return options[selected].activeColor || buttonColor;
  }

  animate = (value, last) => {
    this.animatedValue.setValue(last);
    Animated.timing(this.animatedValue, {
      toValue: value,
      duration: this.props.animationDuration,
      easing: Easing.cubic,
      useNativeDriver: true
    }).start();
  };

  toggleItem = (index, callOnPress = true) => {
    const { options, onPress, isRtl } = this.props;
    if (options.length <= 1 || index === null || isNaN(index)) return;
    this.animate(
      isRtl ? -(index / options.length) : index / options.length,
      isRtl
        ? -(this.state.selected / options.length)
        : this.state.selected / options.length
    );
    if (callOnPress && onPress) {
      onPress(options[index].value);
    }
    this.setState({ selected: index });
  };

  onPressItem = idx => () => {
    return this.toggleItem(idx);
  };

  onLayout = ({ nativeEvent: { layout } }) => {
    const { width } = layout;
    this.setState({
      sliderWidth: width
    });
  };

  render() {
    const {
      textColor,
      selectedColor,
      borderRadius,
      height,
      disabled,
      options,
      fontFamily
    } = this.props;
    const { selected, sliderWidth } = this.state;

    const optionsViews = options.map((element, index) => (
      <View key={index} style={[flexStyle, verticalCenteredFlex]}>
        <TouchableOpacity
          disabled={disabled}
          style={[rowStyle, verticalCenteredFlex, horizontalCenteredFlex]}
          onPress={this.onPressItem(index)}
        >
          {Text({
            style: [
              styles.itemTxtStyle,
              {
                color: selected == index ? selectedColor : textColor
              }
            ],
            center: true,
            fontFamily,
            children: element.label
          })}
        </TouchableOpacity>
      </View>
    ));

    return (
      <View style={rowStyle}>
        <View {...this._panResponder.panHandlers} style={flexStyle}>
          <View
            style={[
              styles.responderStyle,
              {
                borderRadius,
                height
              }
            ]}
            onLayout={this.onLayout}
          >
            <View
              style={[
                flexStyle,
                rowStyle,
                {
                  borderRadius
                }
              ]}
            >
              {!!sliderWidth && (
                <Animated.View
                  style={[
                    {
                      height: height,
                      backgroundColor: this.getBgColor(),
                      width: sliderWidth / options.length - 1.5,
                      transform: [
                        {
                          translateX: this.animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, sliderWidth]
                          })
                        }
                      ],
                      borderRadius
                    },
                    styles.animatedViewStyle
                  ]}
                />
              )}
              {optionsViews}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animatedViewStyle: {
    borderWidth: 0,
    position: "absolute"
  },
  itemTxtStyle: {
    backgroundColor: "transparent",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Montserrat-Medium"
  },
  responderStyle: {
    marginHorizontal: 12,
    backgroundColor: colors.whityGrey
  }
});

SwitchSelector.defaultProps = {
  textColor: "#7c7c7c",
  selectedColor: colors.white,
  borderRadius: 21,
  height: 45,
  buttonColor: colors.appPrimary,
  animationDuration: 100,
  disabled: false
};
