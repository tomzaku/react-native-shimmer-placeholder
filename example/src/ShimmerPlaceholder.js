import React, { PureComponent } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";

const getOutputRange = (width, isReversed) => isReversed ? [width, -width] : [-width, width]

class ShimmerPlaceholder extends PureComponent {
  state = {
    beginShimmerPosition: new Animated.Value(-1)
  }
  getAnimated = () => {
    const { delay, duration, isInteraction } = this.props
    return Animated.loop(Animated.timing(this.state.beginShimmerPosition, {
      toValue: 1,
      delay,
      duration,
      useNativeDriver: true,
      isInteraction
    }))
  }
  animatedValue = this.getAnimated()

  render() {
    return (
      <BaseShimmerPlaceholder {...this.props} animatedValue={this.animatedValue} beginShimmerPosition={this.state.beginShimmerPosition} />
    )
  }
}

ShimmerPlaceholder.defaultProps = {
  delay: 0,
  duration: 1000,
  isInteraction: true
}

const BaseShimmerPlaceholder = (props) => {
  const {
    width = 200,
    height = 15,
    duration = 1000,
    delay = 0,
    shimmerColors = ["#ebebeb", "#c5c5c5", "#ebebeb"],
    isReversed = false,
    stopAutoRun = false,
    visible,
    location = [0.3, 0.5, 0.7],
    style,
    shimmerStyle,
    isInteraction = true,
    LinearGradient,
    children,
    animatedValue,
    beginShimmerPosition
  } = props

  const linearTranslate = beginShimmerPosition.interpolate({
    inputRange: [-1, 1],
    outputRange: getOutputRange(width, isReversed)
  });

  React.useEffect(() => {
    if (!stopAutoRun) {
      animatedValue.start()
    }
    return () => {
      animatedValue.stop()
    }
  }, [stopAutoRun])

  React.useEffect(() => {
    if (visible) {
      animatedValue.stop()
    }
    if (!visible && !stopAutoRun) {
      animatedValue.start()
    }
  }, [visible, stopAutoRun])

  return (
    <View
      style={[!visible && { height, width }, styles.container, !visible && shimmerStyle, style]}
    >
      {
        visible
          ? (children)
          : (
            <View style={{ flex: 1, backgroundColor: shimmerColors[0] }}>
              <Animated.View
                style={{ flex: 1, transform: [{ translateX: linearTranslate }] }}
              >
                <LinearGradient
                  colors={shimmerColors}
                  style={{ flex: 1, width: width }}
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
              <View style={{ width: 0, height: 0, opacity: 0 }}>{children}</View>
            </View>
          )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden"
  },

});

export const createShimmerPlaceholder = (LinearGradient) => React.forwardRef((props, ref) => <ShimmerPlaceholder LinearGradient={LinearGradient} ref={ref} {...props} />)

export default ShimmerPlaceholder