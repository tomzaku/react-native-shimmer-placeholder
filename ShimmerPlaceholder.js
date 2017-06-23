/* @flow */

import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class ShimmerPlaceHolder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      positionLine: new Animated.Value(-this.WIDTH_LINE),
      isDisplayChildComponent: this.props.isDisplayChildComponent ? this.props.isDisplayChildComponent : false
    };
    this.WIDTH = this.props.width;
    this.HEIGHT = this.props.height;
    this.WIDTH_LINE = this.props.widthLine;
    this.refreshIntervalId = null;
    this.positionLine = new Animated.Value(-this.WIDTH_LINE);
    this.duration = this.props.duration;
    this.colorShimmer = this.props.colorShimmer;
    if (this.props.reverse === true ) {
      this.begin = this.WIDTH;
      this.end = -this.WIDTH_LINE;
    }else {
      this.begin = -this.WIDTH_LINE;
      this.end = this.WIDTH;
    }
  }
  componentDidMount() {
    if (this.props.autoRun== true){
      // this.runAnimatedAuto()
      const moveAnimated = this.runAnimated();
      Animated.loop(moveAnimated).start();
    }
  }
  runAnimated = () =>  {
    this.positionLine.setValue(this.begin)
    return Animated.timing(this.positionLine, { // The value to drive
      toValue: this.end, // Target
      duration: this.props.duration, // Configuration
      isInteraction: false
    })
  }
  componentWillReceiveProps({ isDisplayChildComponent }){
    if(isDisplayChildComponent!=undefined&&isDisplayChildComponent!=this.state.isDisplayChildComponent){
      this.setState({
        isDisplayChildComponent: isDisplayChildComponent
      })
    }
  }
  renderShimmerLoading() {
    const { colorShimmer } = this
    if (!this.state.isDisplayChildComponent) return (
      <Animated.View
        style={[
          styles.lineComponent, {
            width: this.WIDTH_LINE,
            left: this.positionLine,
          }
      ]}>
        <LinearGradient
          colors={['#ebebeb', colorShimmer, '#ebebeb']}
          style={styles.linearGradient}
          start={{
            x: 0,
            y: 0.25
          }}
          end={{
            x: 1,
            y: 0.25
          }}
          locations={ [0.1, 0.5, 0.9] }>
          </LinearGradient>
      </Animated.View>
    )
  }
  render () {
    const {isDisplayChildComponent} = this.state;
    return (
      <View>
        <View style={!isDisplayChildComponent?[
          {
            height: this.HEIGHT,
            width: this.WIDTH
          },
          styles.container,
          this.props.style
        ]:[]}>

          {this.renderShimmerLoading()}
          <View style={!isDisplayChildComponent?{ width: 0,height: 0 }:{}}>
            {this.props.children}
          </View>
        </View>
      </View>
    )
  }
}
ShimmerPlaceHolder.defaultProps = {
  width: 200,
  height: 15,
  widthLine: 90,
  duration: 300,
  colorShimmer: '#e2e2e2',
  reverse: false,
  autoRun: false,
};
ShimmerPlaceHolder.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  widthLine: React.PropTypes.number,
  duration: React.PropTypes.number,
  colorShimmer: React.PropTypes.string,
  reverse: React.PropTypes.bool,
  autoRun: React.PropTypes.bool,
};
export default ShimmerPlaceHolder;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    overflow: 'hidden',
  },
  lineComponent: {
    flex: 1,
    position: 'relative',
  },
  linearGradient: {
    flex: 1,
  },
});
