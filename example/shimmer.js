/* @flow */

import React, { PureComponent,Component } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

import ShimmerPlaceHolder from './ShimmerPlaceholder.js'

class Line extends PureComponent {
  render() {
    return (
      <View style={[{
        height: 3,
        backgroundColor: 'rgba(154, 154, 154, 0.29)',
        overflow: 'hidden'
      }, this.props.style]}>
        <View style={[this.props.style]} />
      </View>

    );
  }
}

export default class Shimmer extends Component {
  constructor(props) {
    super(props)
    this.loadingAnimated = []
    this.avatarLoadingAnimated = []
    this.animatedAvatarReverseLoading = []
    this.bigImageAndSomeRowsAnimated = []
    this.state={
      isfetched : false,
      imageIsFetched: false
    }
  }
  componentDidMount(){
    this.runAnimated()
    this.runAvatarAnimated()
    this.runAvatarReverseAnimated()
    this.runBigAvatarAndSomeRowsAnimated()
    setTimeout(()=>this.setState({isfetched:true}),2000)
  }

  runAnimated() {
    // try{
      if (Array.isArray(this.loadingAnimated)&&this.loadingAnimated.length>0) {
        Animated.parallel(
          this.loadingAnimated.map(animate=> {
            if (animate&&animate.moveVerticalLine) {
              return animate.moveVerticalLine()
            }
            return null
          }),
          {
            stopTogether: false
          }
        ).start(() => {
          // if (!this.state.imageIsFetched) {
            this.runAnimated()
          // }
        })
      }
    // }catch(err){
    //   alert(err.message)
    // }
  }
  runAvatarReverseAnimated() {
    // try{
      if (Array.isArray(this.animatedAvatarReverseLoading)&&this.animatedAvatarReverseLoading.length>0) {
        Animated.sequence([
          this.animatedAvatarReverseLoading[0].moveVerticalLine(),
          Animated.parallel(
            this.animatedAvatarReverseLoading.slice(1,this.animatedAvatarReverseLoading.length-1).map(animate=> {
              if (animate&&animate.moveVerticalLine) {
                return animate.moveVerticalLine()
              }
              return null
            }),
            {
              stopTogether: false
            }
          ),
          this.animatedAvatarReverseLoading[this.animatedAvatarReverseLoading.length - 1].moveVerticalLine()
        ]
      ).start(() => {
          // if (!this.state.imageIsFetched) {
            this.runAvatarReverseAnimated()
          // }
        })

      }
    // }catch(err){
    //   alert(err.message)
    // }
  }
  runBigAvatarAndSomeRowsAnimated() {
    if (Array.isArray(this.bigImageAndSomeRowsAnimated)&&this.bigImageAndSomeRowsAnimated.length>0) {
      Animated.parallel(
          [
            this.bigImageAndSomeRowsAnimated[0].moveVerticalLine(),
          ...this.bigImageAndSomeRowsAnimated.slice(1).map(animate => {
            if (animate&&animate.moveVerticalLine) {
              return animate.moveVerticalLine()
            }
            return null
          }),
        ],
        {
          stopTogether: false
        }).start(() => {
        // if (!this.state.isFetched) {
          this.runBigAvatarAndSomeRowsAnimated()
        // }
      })

    }
  }
  runAvatarAnimated() {
    // try{
      if (Array.isArray(this.avatarLoadingAnimated)&&this.avatarLoadingAnimated.length>0) {
        Animated.sequence([
          this.avatarLoadingAnimated[0].moveVerticalLine(),
          Animated.parallel(
            this.avatarLoadingAnimated.slice(1).map(animate=> {
              if (animate&&animate.moveVerticalLine) {
                return animate.moveVerticalLine()
              }
              return null
            }),
            {
              stopTogether: false
            }
          )]
        ).start(() => {
          // if (!this.state.imageIsFetched) {
            this.runAvatarAnimated()
          // }
        })

      }
    // }catch(err){
    //   alert(err.message)
    // }
  }

  render() {
     const {isfetched, imageIsFetched} = this.state
    return (
      <View style={styles.container}>
        <ShimmerPlaceHolder
            ref = {(ref) => this.loadingAnimated.push(ref)}
        />
        <ShimmerPlaceHolder
            ref = {(ref) => this.loadingAnimated.push(ref)}
            style={{marginTop: 7}}
        />
        <ShimmerPlaceHolder
            ref = {(ref) => this.loadingAnimated.push(ref)}
            style={{marginTop: 7}}
        />

        <Line style={{marginTop: 7, marginBottom: 7, paddingLeft: 16}}/>

        <View style={{flexDirection:'row'}}>
          <ShimmerPlaceHolder
              ref = {(ref) => this.avatarLoadingAnimated.push(ref)}
              width = {60}
              height = {60}
              style ={{marginRight: 16}}
          />
          <View >
            <ShimmerPlaceHolder
                ref = {(ref) => this.avatarLoadingAnimated.push(ref)}
            />
            <ShimmerPlaceHolder
                ref = {(ref) => this.avatarLoadingAnimated.push(ref)}
                style={{marginTop: 7}}
            />
            <ShimmerPlaceHolder
                ref = {(ref) => this.avatarLoadingAnimated.push(ref)}
                style={{marginTop: 7, marginBottom: 7}}
            />
          </View>
        </View>
        <Line style={{marginTop: 7, marginBottom: 7, paddingLeft: 16}}/>

        <View style={{flexDirection:'row-reverse'}}>
          <ShimmerPlaceHolder
              ref = {(ref) => this.animatedAvatarReverseLoading.push(ref)}
              width = {60}
              height = {60}
              style ={{marginLeft: 16}}
              reverse
          />
          <View>
            <ShimmerPlaceHolder
                ref = {(ref) => this.animatedAvatarReverseLoading.push(ref)}
                width = {130}
                height = {9}
                reverse
            />
            <ShimmerPlaceHolder
                ref = {(ref) => this.animatedAvatarReverseLoading.push(ref)}
                style={{marginTop: 7}}
                width = {130}
                height = {9}
                reverse
            />
            <ShimmerPlaceHolder
                ref = {(ref) => this.animatedAvatarReverseLoading.push(ref)}
                style={{marginTop: 7}}
                width = {130}
                height = {9}
                reverse
            />
            <ShimmerPlaceHolder
                ref = {(ref) => this.animatedAvatarReverseLoading.push(ref)}
                style={{marginTop: 7}}
                width = {130}
                height = {9}
                reverse
            />
          </View>
          <ShimmerPlaceHolder
              ref = {(ref) => this.animatedAvatarReverseLoading.push(ref)}
              width = {60}
              height = {60}
              style ={{marginRight: 16}}
              reverse
          />
        </View>

        <Line style={{marginTop: 7, marginBottom: 7, paddingLeft: 16}}/>

        <View  style={{alignItems:'center'}} >
          <ShimmerPlaceHolder
              ref = {(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
              width = {175}
              height = {175}
              hideAnimated = {imageIsFetched}
          >
            <Image
              style= {{width: 175, height: 175}}
              source= {{uri: 'https://unsplash.it/324/324'}}
              onLoad = {()=> { this.setState({imageIsFetched: true}) }}

           />
          </ShimmerPlaceHolder>
          <View>
            <ShimmerPlaceHolder
                ref = {(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
                style={{marginTop: 7}}
                width = {350}
                height = {9}
                hideAnimated = {isfetched}
            >
              <Text style={{marginTop: 3}}>Lorem Ipsum is simply dummy text of the printing </Text>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder
                ref = {(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
                style={{marginTop: 7}}
                width = {350}
                height = {9}
                hideAnimated = {isfetched}
            >
              <Text style={{marginTop: 3}}>Lorem Ipsum is simply dummy text of the printing </Text>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder
                ref = {(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
                style={{marginTop: 7}}
                width = {350}
                height = {9}
                hideAnimated = {isfetched}
            >
              <Text style={{marginTop: 3}}>Lorem Ipsum is simply dummy text of the printing </Text>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder
                ref = {(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
                style={{marginTop: 7}}
                width = {350}
                height = {9}
                hideAnimated = {isfetched}
            >
              <Text style={{marginTop: 3}}>Lorem Ipsum is simply dummy text of the printing </Text>
            </ShimmerPlaceHolder>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    marginTop: 40,
  }
})
