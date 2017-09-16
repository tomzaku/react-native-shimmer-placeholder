// import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class CustomLinearGradient extends Component {
  render() {
    const { locationStart, colorShimmer, widthShimmer } = this.props;
    return (
      <LinearGradient
        colors={colorShimmer}
        style={{ flex: 1 }}
        start={{
          x: -1,
          y: 0.5,
        }}
        end={{
          x: 2,
          y: 0.5,
        }}
       //  locations={[0, 0.5, 1]}
        locations={[locationStart + widthShimmer, locationStart + 0.5 + widthShimmer / 2, locationStart + 1]}
      />
    );
  }
}
CustomLinearGradient.propTypes = {
  locationStart: React.PropTypes.any,
  colorShimmer: React.PropTypes.array,
  widthShimmer: React.PropTypes.number,
};


Animated.LinearGradient = Animated.createAnimatedComponent(CustomLinearGradient);


// create a component
class ShimmerPlaceHolder extends Component {
  constructor(props) {
    super(props);
    // this.beginShimmerPosition = new Animated.Value(-1);
    this.state = {
      visible: false,
      beginShimmerPosition: new Animated.Value(-1),
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
    shimmerAnimated.start(() => {
      this.loopAnimated();
    })
  }
  getAnimated = () => {
    // this.state.color.setValue(0);
    this.state.beginShimmerPosition.setValue(-1);
    return Animated.timing(this.state.beginShimmerPosition, {
      toValue: 1,
      duration: this.props.duration,
      // useNativeDriver: true,
      // easing: Easing.linear,
      // delay: -400
    });
  }
  render() {
    const { width, reverse, height, colorShimmer, style, widthShimmer, children, visible, backgroundColorBehindBorder, hasBorder } = this.props;
    let beginPostioner = -0.7;
    let endPosition = 0.7;
    if (reverse) {
      beginPostioner = 0.7;
      endPosition = -0.7;
    }
    const newValue = this.state.beginShimmerPosition.interpolate({
      inputRange: [-1, 1],
      outputRange: [beginPostioner, endPosition],
    });
    return (
        <View style={!visible
        ? [{ height, width }, styles.container, style]
        : []
        }
        >
          {!visible
          ? (
            <View style={{ flex: 1 }}>
              <Animated.LinearGradient
                locationStart={newValue}
                colorShimmer={colorShimmer}
                widthShimmer={widthShimmer}
              />
              {/* Force run children */}
              <View style={{ width: 0, height: 0 }}>
                {this.props.children}
              </View>
              {((style && style.borderRadius) || hasBorder) && Platform.OS === 'android'
              ? <View style={{
                position: 'absolute',
                top: -40,
                bottom: -40,
                right: -40,
                left: -40,
                borderRadius: width / 2 + 40 / 2,
                borderWidth: 40,
                borderColor: backgroundColorBehindBorder,
              }}
              />
               : null }
            </View>
            )
          : children
          }
        </View>
    );
  }
}
ShimmerPlaceHolder.defaultProps = {
  width: 200,
  height: 15,
  widthShimmer: 0.7,
  duration: 1000,
  colorShimmer: ['#ebebeb', '#c5c5c5', '#ebebeb'],
  reverse: false,
  autoRun: false,
  visible: false,
  backgroundColorBehindBorder: 'white',
  hasBorder: false,
};
// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    overflow: 'hidden',
  },
});
ShimmerPlaceHolder.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  widthShimmer: React.PropTypes.number,
  duration: React.PropTypes.number,
  colorShimmer: React.PropTypes.array,
  reverse: React.PropTypes.bool,
  autoRun: React.PropTypes.bool,
  visible: React.PropTypes.bool,
  children: React.PropTypes.any,
  style: React.PropTypes.any,
  backgroundColorBehindBorder: React.PropTypes.string,
  hasBorder: React.PropTypes.bool,
};
// make this component available to the app
export default ShimmerPlaceHolder;
