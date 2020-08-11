import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  InteractionManager,
  PanResponder
} from "react-native";
import Text from "../Text";
import Icon from "../Icon";
import { colors, registeredStyles } from "../../utilities/theme";

export default class DashedSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.value || 0,
      pan: new Animated.ValueXY()
    };

    this.scroll = null;
    this._val = { x: 0, y: 0 };

    this.state.pan.addListener(value => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x
        }
      ]),
      onPanResponderRelease: (e, gesture) => {
        // const xLine = width + gesture.dx - 30;
        // this.setState({ xLine });
        Animated.spring(this.state.pan, { toValue: { x: 0 } }).start();
      }
    });
  }

  setThermoScroll = ref => (this.scroll = ref);

  // componentDidMount() {
  //   const { value } = this.props;
  //   InteractionManager.runAfterInteractions(() => {
  //     this.scroll.scrollTo({
  //       x: 327.8 + value * 11,
  //       animated: true
  //     });
  //   });
  // }

  renderDashedComponent = value => {
    const { selectedValue } = this.state;
    const isTracked = value <= selectedValue;
    let items = [];
    for (let index = 1; index < 11; index++) {
      items = [
        ...items,
        <View
          key={index}
          style={[
            styles.dashedComponent,
            index === 10 && styles.dashedLastItem,
            isTracked && styles.selectedItemStyle
          ]}
        />
      ];
    }

    return (
      <View style={styles.dashedWrapper} key={value}>
        <View
          style={[
            registeredStyles.rowStyle,
            registeredStyles.horizontalCenteredFlex
          ]}
        >
          {items}
        </View>
        {Text({
          center: true,
          children: value,
          style: [
            styles.valueItemStyle,
            registeredStyles.selfCentered,
            isTracked && { color: colors.appPrimary }
          ]
        })}
      </View>
    );
  };

  renderMainThermometer = () => {
    const { minStep, maxStep, stepBy } = this.props;
    let dashedItems = [];
    for (let index = minStep; index < maxStep; index += stepBy) {
      dashedItems = [...dashedItems, this.renderDashedComponent(index)];
    }

    return dashedItems;
  };

  onLayout = ({
    nativeEvent: {
      // contentOffset: { x },
      layout
    }
  }) => {
    console.log("lay", layout);
  };

  onScroll = ({ nativeEvent: { contentOffset } }) => {
    console.log("contentOffset", contentOffset);
  };

  render() {
    const { pan } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform()
    };

    return (
      <View style={[registeredStyles.flexStyle, styles.scrollStyle]}>
        {Icon({
          name: "arrow-drop-down",
          size: 25,
          color: colors.appPrimary,
          containerStyle: { marginLeft: 0 },
          iconStyle: { marginLeft: 0, padding: 0 }
        })}
        <ScrollView
          horizontal
          shouldRasterizeIOS
          scrollEnabled
          ref={this.setThermoScroll}
          showsHorizontalScrollIndicator={false}
          onScroll={this.onScroll}
          onLayout={this.onLayout}
        >
          {this.renderMainThermometer().map(component => component)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollStyle: {
    overflow: "hidden",
    height: 45,
    marginHorizontal: 15,
    marginBottom: 8
  },
  dashedWrapper: {
    width: 55,
    maxWidth: 55,
    maxHeight: 45
  },
  dashedComponent: {
    width: 2.5,
    height: 13,
    marginRight: 3,
    borderRadius: 2,
    backgroundColor: colors.whityGrey
  },
  dashedLastItem: {
    height: 23
  },
  valueItemStyle: {
    width: 15,
    height: 15,
    fontFamily: "Montserrat",
    fontSize: 12,
    fontWeight: "300",
    fontStyle: "normal",
    color: colors.placeholder
  },
  selectedItemStyle: {
    backgroundColor: colors.appPrimary
  }
});
