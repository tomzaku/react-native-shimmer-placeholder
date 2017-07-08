//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class CustomLinearGradient extends Component {
  render() {
    const { color, colorShimmer, widthShimmer } = this.props;
    // const color = '#4c669f';
    return (
      <LinearGradient
        colors={colorShimmer} 
        style={{ flex: 1 }}
        start={{
          x: -1 ,
          y: 0.5,
        }}
        end={{
          x: 2,
          y: 0.5,
        }}
       //  locations={[0, 0.5, 1]}
        locations={[color + widthShimmer , color + 0.5 + widthShimmer / 2 , color + 1 ]}
      />
    )
  }
}

Animated.ALinearGradient = Animated.createAnimatedComponent(CustomLinearGradient);


// create a component
class ShimmerPlaceHolder extends Component {
  constructor(props) {
    super(props);
    // this.beginShimmerPosition = new Animated.Value(-1);
    this.state = {
      isDisplayChildComponent: false,
      beginShimmerPosition: new Animated.Value(-1),
    }
  }
  componentDidMount = () => {
    const { autoRun } = this.props;
    const shimmerAnimated = this.getAnimated();
    if ( autoRun ) {
      Animated.loop(shimmerAnimated).start();
    }
  }
  getAnimated = () => {
    // this.state.color.setValue(0);
    return Animated.timing(this.state.beginShimmerPosition, {
      toValue: 1,
      duration: this.props.duration,
      // useNativeDriver: true,
      // easing: Easing.linear,
      // delay: -400
    });
  }
  componentWillReceiveProps({ isDisplayChildComponent }){
    // if(isDisplayChildComponent!=undefined&&isDisplayChildComponent!=this.state.isDisplayChildComponent){
    //   this.setState({
    //     isDisplayChildComponent: isDisplayChildComponent
    //   })
    // }
  }
  render() {
    const { width, reverse, height, colorShimmer, style, widthShimmer, children } = this.props;
    // let beginPostioner = -1;
    // let endPosition = 1;
    // if (reverse) {
    //   beginPostioner = 1;
    //   endPosition = -1;
    // }
    const { isDisplayChildComponent } = this.props;
    const newValue = this.state.beginShimmerPosition.interpolate({
      inputRange: [-1, 1],
      outputRange: [-1, 1]
    });
    return (
      <View style={!isDisplayChildComponent?[
          {
            height,
            width,
          },
          styles.container,
          style
        ]:[]}>
        {!isDisplayChildComponent
        ? (
          <View style={{ flex: 1}}>
            <Animated.ALinearGradient
              color={newValue}
              colorShimmer={colorShimmer}
              widthShimmer={widthShimmer}
            />
             {/*Force run children */}
            <View style={{ width: 0,height: 0 }}> 
            {this.props.children}
            </View>
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
  duration: 3000,
  colorShimmer: ['#ebebeb', '#818181', '#ebebeb'],
  reverse: false,
  autoRun: false,
  isDisplayChildComponent: false,
};
// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // overflow: 'hidden',
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
};
// make this component available to the app
export default ShimmerPlaceHolder;
