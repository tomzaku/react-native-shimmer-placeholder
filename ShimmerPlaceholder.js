/* @flow */

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  InteractionManager
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default class ShimmerPlaceHolder extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      positionVerticalLine: new Animated.Value(-this.WIDTH_LINE),
      animating: this.props.animating || false
    }
    this.WIDTH = this.props.width || 200
    this.HEIGHT = this.props.height || 15
    this.WIDTH_LINE = this.props.widthLine || 90
    this.refreshIntervalId = null
    this.positionVerticalLine = new Animated.Value(-this.WIDTH_LINE)
    this.duration = this.props.duration || 300
    if (this.props.reverse === true ) {
      this.begin = this.WIDTH
      this.end = -this.WIDTH_LINE
    }else {
      this.begin = -this.WIDTH_LINE
      this.end = this.WIDTH
    }

  }
  componentDidMount () {
    if (this.props.autoRun== true){
      this.moveVerticalLineAuto()
    }
  }
  moveVerticalLine = () =>  {
    this.positionVerticalLine.setValue(this.begin)
    return Animated.timing(this.positionVerticalLine, { // The value to drive
      toValue: this.end, // Target
      duration: this.props.duration, // Configuration
    })
  }
  moveVerticalLineAuto(){
    this.positionVerticalLine.setValue(this.begin)
    Animated.timing(this.positionVerticalLine, { // The value to drive
      toValue: this.end, // Target
      duration: this.props.duration, // Configuration
    }).start((event) => {
      if (!this.state.animating) {
        this.moveVerticalLineAuto()
      }
    })
  }

  componentWillReceiveProps({animating}){
    if(animating!=this.state.animating){
      this.setState({
        animating:animating
      })
    }
  }
  renderShimmerLoading1() {
    if (this.state.animating != true) return (
      <View style={{backgroundColor :'red',width:200,height:200}}/>
    )
  }
  renderShimmerLoading() {
    if (this.state.animating != true) return (
      <Animated.View
        style={[
          styles.lineComponent, {
            width: this.WIDTH_LINE,
            left: this.positionVerticalLine,
          }
      ]}>
        <LinearGradient
          colors={['#ebebeb', '#e2e2e2', '#ebebeb']}
          style={styles.linearGradient}
          start={{
            x: 0,
            y: 0.25
          }}
          end={{
            x: 1,
            y: 0.25
          }}
          locations={[0.1, 0.5, 0.9]}>
          </LinearGradient>
      </Animated.View>
    )
  }
  render () {
    const {animating} = this.state;
    return (
      <View>
        <View style={!animating?[
          {
            height: this.HEIGHT,
            width: this.WIDTH
          },
          styles.container,
          this.props.style
        ]:[
        ]}>

          {this.renderShimmerLoading()}
          <View style={!animating?{width:0,height:0}:{}}>
            {this.props.children}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    overflow: 'hidden'
  },
  lineComponent: {
    flex: 1,
    position: 'relative',
  },
  linearGradient: {
    flex: 1,
  }
});
