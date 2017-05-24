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
      hideAnimated: this.props.hideAnimated || false
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
  componentWillMount () {}
  componentDidMount () {
    // this.moveVerticalLineAuto()
    // this.refreshIntervalId=setInterval(()=>{
    //   beginLinePosition=this.state.beginLinePosition>0.8?0:(this.state.beginLinePosition+0.08)
    //   this.setState({
    //     beginLinePosition
    //   })
    // },100)
  }
  moveVerticalLine = () =>  {
    this.positionVerticalLine.setValue(this.begin)
    return Animated.timing(this.positionVerticalLine, { // The value to drive
      toValue: this.end, // Target
      duration: this.props.duration, // Configuration
      // easing: Easing.linear,
      // isInteraction: false
      // velocity: 100,
      // tension: -4,
      // friction: 1,
    })
  }
  moveVerticalLineAuto(){
    this.positionVerticalLine.setValue(this.begin)
    Animated.timing(this.positionVerticalLine, { // The value to drive
      toValue: this.end, // Target
      duration: this.props.duration, // Configuration
      // easing: Easing.linear,
      // delay: 200,
      // isInteraction: false
      // velocity: 100,
      // tension: -4,
      // friction: 1,
    }).start((event) => {
      if (!this.state.hideAnimated) {
        this.moveVerticalLineAuto()
      }
    })
  }
  componentWillUnmount () {
    // clearInterval(this.refreshIntervalId);

  }
  componentWillReceiveProps({hideAnimated}){
    // console.log(">>>Props",props);
    if(hideAnimated!=this.state.hideAnimated){
      this.setState({
        hideAnimated:hideAnimated
      })
    }
  }
  renderShimmerLoading1() {
    // console.log(">>>.",this.state.hideAnimated,(this.state.hideAnimated != true));
    if (this.state.hideAnimated != true) return (
      <View style={{backgroundColor :'red',width:200,height:200}}/>
    )
  }
  renderShimmerLoading() {
    // console.log(">>>.",this.state.hideAnimated,(this.state.hideAnimated != true));
    if (this.state.hideAnimated != true) return (
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

    // const childrenWithProps = React.Children.map(this.props.children,
    //  (child) => React.cloneElement(child, {
    //   //  doSomething: this.doSomething
    //  })
    // )
    const {hideAnimated} = this.state;
    // if (hideAnimated === true) return (
    //   <View>
    //     {this.props.children}
    //   </View>
    // )
    return (
      <View>
        <View style={!hideAnimated?[
          {
            height: this.HEIGHT,
            width: this.WIDTH
          },
          styles.container,
          this.props.style
        ]:[
        ]}>

          {this.renderShimmerLoading()}
          <View style={!hideAnimated?{width:0,height:0}:{}}>
            {this.props.children}
          </View>
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    backgroundColor: '#ebebeb',
    overflow: 'hidden'
    // position:'absolute',
  },
  lineComponent: {
    flex: 1,
    position: 'relative',
    // zIndex:3
  },
  linearGradient: {
    flex: 1,
    // width: 80,
    // zIndex: 4,
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5
  }
});
