import React from "react";
import { Animated, Easing } from "react-native";
const { PureComponent } = React;
const ANIMATED_EASING_PREFIXES = ["easeInOut", "easeOut", "easeIn"];

export default class Collapsible extends PureComponent {
  static defaultProps = {
    enablePointerEvents: false
  };

  constructor(props) {
    super(props);
    this.state = {
      measuring: false,
      measured: false,
      height: new Animated.Value(props.collapsedHeight),
      contentHeight: 0,
      animating: false
    };
  }

  componentDidUpdate(prevProps) {
    const { collapsed } = this.props;
    if (prevProps.collapsed !== collapsed) {
      this.setState({ measured: false }, () =>
        this._componentDidUpdate(prevProps)
      );
    } else {
      this._componentDidUpdate(prevProps);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  _componentDidUpdate(prevProps) {
    const { collapsed, collapsedHeight } = this.props;
    if (prevProps.collapsed !== collapsed) {
      this._toggleCollapsed(collapsed);
    } else if (collapsed && prevProps.collapsedHeight !== collapsedHeight) {
      this.state.height.setValue(collapsedHeight);
    }
  }

  contentHandle = null;

  _handleRef = ref => (this.contentHandle = ref);

  _measureContent(callback) {
    const { collapsedHeight } = this.props;
    this.setState(
      {
        measuring: true
      },
      () => {
        requestAnimationFrame(() => {
          if (!this.contentHandle) {
            this.setState(
              {
                measuring: false
              },
              () => callback(collapsedHeight)
            );
          } else {
            this.contentHandle.getNode().measure((x, y, width, height) => {
              this.setState(
                {
                  measuring: false,
                  measured: true,
                  contentHeight: height
                },
                () => callback(height)
              );
            });
          }
        });
      }
    );
  }

  _toggleCollapsed(collapsed) {
    const { collapsedHeight } = this.props;
    const { measured, contentHeight } = this.state;
    if (collapsed) {
      this._transitionToHeight(collapsedHeight);
    } else if (!this.contentHandle) {
      if (measured) {
        this._transitionToHeight(contentHeight);
      }
      return;
    } else {
      this._measureContent(contentHeight =>
        this._transitionToHeight(contentHeight)
      );
    }
  }

  _transitionToHeight(height) {
    const { duration, onAnimationEnd, ...otherProps } = this.props;
    let { easing } = otherProps;
    if (typeof easing === "string") {
      let prefix;
      let found = false;
      for (let i = 0; i < ANIMATED_EASING_PREFIXES.length; i++) {
        prefix = ANIMATED_EASING_PREFIXES[i];
        if (easing.substr(0, prefix.length) === prefix) {
          easing =
            easing.substr(prefix.length, 1).toLowerCase() +
            easing.substr(prefix.length + 1);
          prefix = prefix.substr(4, 1).toLowerCase() + prefix.substr(5);
          easing = Easing[prefix](Easing[easing || "ease"]);
          found = true;
          break;
        }
      }
      if (!found) {
        easing = Easing[easing];
      }
      if (!easing) {
        throw new Error('Invalid easing type "' + easing + '"');
      }
    }

    if (this._animation) {
      this._animation.stop();
    }
    this.setState({ animating: true });
    this._animation = Animated.timing(this.state.height, {
      toValue: height,
      duration,
      easing
    }).start(() => {
      if (this.unmounted) {
        return;
      }
      this.setState({ animating: false }, () => {
        if (this.unmounted) {
          return;
        }
        onAnimationEnd();
      });
    });
  }

  _handleLayoutChange = ({ nativeEvent: { layout } }) => {
    const { collapsed } = this.props;
    const { animating, measuring, contentHeight: stateContHeight } = this.state;
    const contentHeight = layout.height;
    if (
      animating ||
      collapsed ||
      measuring ||
      stateContHeight === contentHeight
    ) {
      return;
    }

    this.state.height.setValue(contentHeight);
    this.setState({ contentHeight });
  };

  render() {
    const {
      collapsed,
      enablePointerEvents,
      children,
      style: styleProps,
      align
    } = this.props;
    const {
      height,
      contentHeight,
      measuring,
      measured,
      animating
    } = this.state;
    const hasKnownHeight = !measuring && (measured || collapsed);
    const style = hasKnownHeight && {
      overflow: "hidden",
      height: height
    };
    let contentStyle = {};
    if (measuring) {
      contentStyle = {
        ...contentStyle,
        position: "absolute",
        opacity: 0
      };
    } else if (align === "center") {
      contentStyle = {
        ...contentStyle,
        transform: [
          {
            translateY: height.interpolate({
              inputRange: [0, contentHeight],
              outputRange: [contentHeight / -2, 0]
            })
          }
        ]
      };
    } else if (align === "bottom") {
      contentStyle = {
        ...contentStyle,
        transform: [
          {
            translateY: height.interpolate({
              inputRange: [0, contentHeight],
              outputRange: [-contentHeight, 0]
            })
          }
        ]
      };
    }
    return (
      <Animated.View
        style={style}
        pointerEvents={!enablePointerEvents && collapsed ? "none" : "auto"}
      >
        <Animated.View
          ref={this._handleRef}
          style={[styleProps, contentStyle]}
          onLayout={animating ? undefined : this._handleLayoutChange}
        >
          {children}
        </Animated.View>
      </Animated.View>
    );
  }
}
