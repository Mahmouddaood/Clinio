import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import { registeredStyles } from "../../utilities/theme";
const { width, height } = Dimensions.get("window");

const { PureComponent } = React;

const {
  flexStyle,
  rowStyle,
  horizontalCenteredFlex,
  verticalCenteredFlex,
  rtlRow
} = registeredStyles;

const isIphoneX =
  Platform.OS === "ios" && !Platform.isTV && (height === 812 || width === 812);

class AppIntroSlider extends PureComponent {
  constructor(props) {
    super(props);
    const { slides } = props;
    this.state = {
      width,
      height,
      slidesItems: slides || [],
      activeIndex: 0,
      shouldSlide: this.handleShouldSlide(slides)
    };

    this._interval = setInterval(() => {
      const { shouldSlide, activeIndex, slidesItems } = this.state;
      if (shouldSlide) {
        const allLength = slidesItems && slidesItems.length;
        const newSlide = activeIndex === allLength - 1 ? 0 : activeIndex + 1;
        this.goToSlide(newSlide);
      }
    }, 2000);
  }

  flatList = null;

  handleShouldSlide = slides => {
    return Array.isArray(slides) && slides.length > 1;
  };

  goToSlide = pageNum => {
    const { width } = this.state;
    this.setState({ activeIndex: pageNum });
    return this.flatList.scrollToOffset({
      offset: pageNum * width
    });
  };

  componentWillReceiveProps({ slides: nextSlides }) {
    const { slides: slidesItems } = this.props;
    if (
      nextSlides &&
      JSON.stringify(nextSlides) !== JSON.stringify(slidesItems)
    ) {
      this.setState({
        slidesItems: nextSlides,
        shouldSlide: this.handleShouldSlide(nextSlides)
      });
    }
  }

  _renderItem = ({ item }) => {
    const { width, height } = this.state;
    const { renderItem } = this.props;
    const { viewStyle } = StyleSheet.create({
      viewStyle: {
        width,
        height: height - 50
      }
    });

    return (
      <View style={viewStyle}>
        {renderItem ? renderItem({ ...item, width }) : null}
      </View>
    );
  };

  _renderPagination = () => {
    const { isRtl, paginationContainerStyle, paginationDotsStyle } = this.props;
    const { activeIndex, slidesItems } = this.state;
    const handlePress = i => () => this.goToSlide(i);

    return (
      <View
        style={[
          flexStyle,
          styles.paginationContainer,
          paginationContainerStyle
        ]}
      >
        <View
          style={[
            styles.paginationDots,
            isRtl ? rtlRow : rowStyle,
            verticalCenteredFlex,
            horizontalCenteredFlex,
            paginationDotsStyle
          ]}
        >
          {slidesItems &&
            slidesItems.length > 0 &&
            slidesItems.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dot,
                  activeIndex === i ? styles.activeDotStyle : styles.dotStyle
                ]}
                onPress={handlePress(i)}
              />
            ))}
        </View>
      </View>
    );
  };

  _onMomentumScrollEnd = ({ nativeEvent: { contentOffset } }) => {
    const { width, activeIndex } = this.state;
    const { isRtl } = this.props;
    const offset = contentOffset.x;
    const newIndex = Math.round(offset / width);
    if (isRtl && !contentOffset.x) {
      this.setState({ activeIndex: 0 });
    } else if (activeIndex !== newIndex) {
      this.setState({ activeIndex: newIndex });
    }
  };

  _onLayout = () => {
    const { width: itemWidth, height: itemHeight, activeIndex } = this.state;
    if (width !== itemWidth || height !== itemHeight) {
      this.setState({ width, height });
      const func = () => {
        this.flatList.scrollToOffset({
          offset: activeIndex * width,
          animated: true
        });
      };
      return Platform.OS === "android" ? setTimeout(func, 0) : func();
    }
  };

  componentWillUnmount() {
    const { shouldSlide } = this.state;
    if (shouldSlide) {
      clearInterval(this._interval);
    }
  }

  render() {
    const { bottomComponent, style } = this.props;
    const { slidesItems, width: itemWidth, shouldSlide } = this.state;

    return (
      <View style={[flexStyle, style]}>
        <FlatList
          ref={ref => (this.flatList = ref)}
          data={slidesItems}
          horizontal
          pagingEnabled={shouldSlide}
          scrollEnabled={shouldSlide}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={flexStyle}
          renderItem={this._renderItem}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          extraData={itemWidth}
          onLayout={this._onLayout}
        />

        {this._renderPagination()}

        {bottomComponent && bottomComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paginationContainer: {
    position: "absolute",
    bottom: 75 + (isIphoneX ? 50 : 0),
    left: 0,
    right: 0
  },
  paginationDots: {
    height: 16,
    margin: 16
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    marginHorizontal: 4
  },
  activeDotStyle: {
    backgroundColor: "rgba(255, 255, 255, .9)"
  },
  dotStyle: {
    backgroundColor: "rgba(0, 0, 0, .2)"
  }
});

export default AppIntroSlider;
