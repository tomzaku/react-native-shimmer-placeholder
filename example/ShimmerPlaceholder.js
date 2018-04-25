// import liraries
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Animated, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";

// create a component
class ShimmerPlaceHolder extends Component {
  constructor(props) {
    super(props);
    // this.beginShimmerPosition = new Animated.Value(-1);
    this.state = {
      visible: false,
      beginShimmerPosition: new Animated.Value(-1)
    };
  }
  componentDidMount() {
    const { autoRun } = this.props;
    if (autoRun) {
      this.loopAnimated();
    }
  }
  loopAnimated() {
    const shimmerAnimated = this.getAnimated();
    const { visible } = this.props;
    shimmerAnimated.start(() => {
      if (!visible) {
        this.loopAnimated();
      }
    });
  }
  getAnimated = () => {
    // this.state.color.setValue(0);
    this.state.beginShimmerPosition.setValue(-1);
    return Animated.timing(this.state.beginShimmerPosition, {
      toValue: 1,
      duration: this.props.duration,
      useNativeDriver: true
      // easing: Easing.linear,
      // delay: -400
    });
  };
  render() {
    const {
      width,
      reverse,
      height,
      colorShimmer,
      style,
      widthShimmer,
      children,
      visible,
      backgroundColorBehindBorder,
      hasBorder,
      location
    } = this.props;
    let outputRange = [-width, width];
    if (reverse) {
      outputRange = outputRange.reverse();
    }
    const linearTranslate = this.state.beginShimmerPosition.interpolate({
      inputRange: [-1, 1],
      outputRange: outputRange
    });
    return (
      <View
        style={!visible ? [{ height, width }, styles.container, style] : []}
      >
        {!visible ? (
          <View style={{ flex: 1, backgroundColor: colorShimmer[0] }}>
            {/* USING TRANSFORM */}
            <Animated.View
              style={{ flex: 1, transform: [{ translateX: linearTranslate }] }}
            >
              <LinearGradient
                colors={colorShimmer}
                style={{ flex: 1 }}
                start={{
                  x: -1,
                  y: 0.5
                }}
                end={{
                  x: 2,
                  y: 0.5
                }}
                locations={location}
              />
            </Animated.View>
            {/* Force run children */}
            <View style={{ width: 0, height: 0 }}>{this.props.children}</View>
            {/* If style has border */}
            {((style && style.borderRadius) || hasBorder) &&
            Platform.OS === "android" ? (
              <View
                style={{
                  position: "absolute",
                  top: -40,
                  bottom: -40,
                  right: -40,
                  left: -40,
                  borderRadius: width / 2 + 40 / 2,
                  borderWidth: 40,
                  borderColor: backgroundColorBehindBorder
                }}
              />
            ) : null}
          </View>
        ) : (
          children
        )}
      </View>
    );
  }
}
ShimmerPlaceHolder.defaultProps = {
  width: 200,
  height: 15,
  widthShimmer: 0.7,
  duration: 1000,
  colorShimmer: ["#ebebeb", "#c5c5c5", "#ebebeb"],
  reverse: false,
  autoRun: false,
  visible: false,
  backgroundColorBehindBorder: "white",
  hasBorder: false,
  location: [0.3, 0.5, 0.7]
};
// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    overflow: "hidden"
  }
});
ShimmerPlaceHolder.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  widthShimmer: PropTypes.number,
  duration: PropTypes.number,
  colorShimmer: PropTypes.array,
  reverse: PropTypes.bool,
  autoRun: PropTypes.bool,
  visible: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.any,
  backgroundColorBehindBorder: PropTypes.string,
  hasBorder: PropTypes.bool
};
// make this component available to the app
export default ShimmerPlaceHolder;
