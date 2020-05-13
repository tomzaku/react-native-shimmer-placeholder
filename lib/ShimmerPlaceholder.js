import { Animated, Platform, StyleSheet, View } from "react-native";
// import liraries
import React, { Component } from "react";

import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

// create a component
class ShimmerPlaceHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beginShimmerPosition: new Animated.Value(-1)
    };
    this.animationValue = this.getAnimated();
  }
  componentDidMount() {
    const { autoRun } = this.props;
    if (autoRun) {
      this.loopAnimated();
    }
  }
  componentWillUnmount() {
    this.animationValue.stop()
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && (this.props.visible !== prevProps.visible)) {
      this.animationValue.stop()
      // console.log('componentDidUpdate on stop', this.props.visible)
    } else if ((!this.props.visible) && (this.props.visible !== prevProps.visible)){
      this.animationValue.start()
      // console.log('componentDidUpdate on start', this.props.visible)
    }
  }

  loopAnimated() {
    this.animationValue.start()
  }
  getAnimated = () => {
    return Animated.loop(Animated.timing(this.state.beginShimmerPosition, {
      toValue: 1,
      delay: this.props.delay,
      duration: this.props.duration,
      useNativeDriver: true,
      isInteraction: this.props.isInteraction
    }))
  }

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
                style={{ flex: 1, width: width * widthShimmer }}
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
                  borderRadius: style.borderRadius || width / 2 + 40 / 2,
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
  widthShimmer: 1,
  duration: 1000,
  delay: 0,
  colorShimmer: ["#ebebeb", "#c5c5c5", "#ebebeb"],
  reverse: false,
  autoRun: false,
  visible: false,
  backgroundColorBehindBorder: "white",
  hasBorder: false,
  location: [0.3, 0.5, 0.7],
  isInteraction: true
};

// define your styles
const styles = StyleSheet.create({
  container: {
    overflow: "hidden"
  }
});

ShimmerPlaceHolder.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  widthShimmer: PropTypes.number,
  duration: PropTypes.number,
  delay: PropTypes.number,
  colorShimmer: PropTypes.array,
  reverse: PropTypes.bool,
  autoRun: PropTypes.bool,
  visible: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.any,
  backgroundColorBehindBorder: PropTypes.string,
  hasBorder: PropTypes.bool,
  location: PropTypes.array,
  isInteraction: PropTypes.bool
};

export default ShimmerPlaceHolder;
