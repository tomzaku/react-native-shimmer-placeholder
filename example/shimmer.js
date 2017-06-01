/* @flow */

import React, { PureComponent, Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, ScrollView } from 'react-native';

import ShimmerPlaceHolder from './ShimmerPlaceholder.js';

class Line extends PureComponent {
  render() {
    return (
      <View style={[{
        height: 3,
        backgroundColor: 'rgba(154, 154, 154, 0.29)',
        overflow: 'hidden',
      }, this.props.style]}
      >
        <View style={[this.props.style]} />
      </View>
    );
  }
}

export default class Shimmer extends Component {
  constructor(props) {
    super(props);
    this.loadingAnimated = [];
    this.avatarLoadingAnimated = [];
    this.animatedAvatarReverseLoading = [];
    this.bigImageAndSomeRowsAnimated = [];
    this.state = {
      isfetched: false,
      imageIsFetched: false,
    };
  }
  componentDidMount() {
    this.runAnimated();
    this.runAvatarAnimated();
    this.runAvatarReverseAnimated();
    this.runBigAvatarAndSomeRowsAnimated();
    setTimeout(() => this.setState({ isfetched: true }), 2000);
  }

  runAnimated() {
    if (Array.isArray(this.loadingAnimated) && this.loadingAnimated.length > 0) {
      Animated.parallel(
        this.loadingAnimated.map(animate => {
          if (animate && animate.runAnimated) {
            return animate.runAnimated();
          }
          return null;
        }),
        {
          stopTogether: false,
        },
      ).start(() => {
        this.runAnimated();
      });
    }
  }
  runAvatarReverseAnimated() {
    if (Array.isArray(this.animatedAvatarReverseLoading) &&
        this.animatedAvatarReverseLoading.length > 0) {
      Animated.sequence([
        this.animatedAvatarReverseLoading[0].runAnimated(),
        Animated.parallel(
          this.animatedAvatarReverseLoading.slice(1, this.animatedAvatarReverseLoading.length-1).map(animate => {
            if (animate && animate.runAnimated) {
              return animate.runAnimated();
            }
            return null;
          }),
          {
            stopTogether: false,
          },
        ),
        this.animatedAvatarReverseLoading[this.animatedAvatarReverseLoading.length - 1].runAnimated(),
      ]
    ).start(() => {
        this.runAvatarReverseAnimated();
      })
    }
  }
  runBigAvatarAndSomeRowsAnimated() {
    if (Array.isArray(this.bigImageAndSomeRowsAnimated) && this.bigImageAndSomeRowsAnimated.length > 0) {
      Animated.parallel(
        [
          this.bigImageAndSomeRowsAnimated[0].runAnimated(),
          ...this.bigImageAndSomeRowsAnimated.slice(1).map(animate => {
          if (animate && animate.runAnimated) {
            return animate.runAnimated();
          }
            return null;
          }),
        ],
        {
          stopTogether: false,
        }).start(() => {
          this.runBigAvatarAndSomeRowsAnimated();
    })
    }
  }
  runAvatarAnimated() {
    if (Array.isArray(this.avatarLoadingAnimated) && this.avatarLoadingAnimated.length > 0) {
      Animated.sequence([
        this.avatarLoadingAnimated[0].runAnimated(),
        Animated.parallel(
          this.avatarLoadingAnimated.slice(1).map(animate => {
            if (animate&&animate.runAnimated) {
              return animate.runAnimated();
            }
            return null
          }),
          {
            stopTogether: false
          }
        )]
      ).start(() => {
          this.runAvatarAnimated()
      })
    }
  }
  _renderRows(loadingAnimated,number,uniqueKey){
    shimmerRows=[]
    for(let index=0;index<number;index++ ){
      shimmerRows.push(
        <ShimmerPlaceHolder
          key={`loading-${index}-${uniqueKey}`}
          ref = {(ref) => loadingAnimated.push(ref)}
          style={{ marginBottom: 7 }}
        />
      )
    }
    return(
      <View>
        {shimmerRows}
      </View>
    )
  }
  _renderImageAndRows() {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <ShimmerPlaceHolder
            ref={(ref) => this.avatarLoadingAnimated.push(ref)}
            width={60}
            height={60}
            style={{ marginRight: 16 }}
          />
          {this._renderRows(this.avatarLoadingAnimated, 3, 'image-row')}
        </View>
      </View>
    )
  }
  _renderReverseAnimated(animatedAvatarReverseLoading,number) {
    let shimmerRows = []
    for (let index = 0; index < number; index++) {
      shimmerRows.push(
        <ShimmerPlaceHolder
          key={`reverse-${index}`}
          ref={(ref) => animatedAvatarReverseLoading.push(ref)}
          style={{ marginBottom: 7, marginLeft: 16 }}
          width={130}
          height={9}
          reverse
        />
      );
    }
    avatar = (
      <ShimmerPlaceHolder
        ref={(ref) => animatedAvatarReverseLoading.push(ref)}
        width={60}
        height={60}
        style={{ marginLeft: 16 }}
      reverse
        />)
    return(
      <View style={{ flexDirection: 'row-reverse' }}>
        {avatar}
        <View>
          {shimmerRows}
        </View>
        {avatar}
      </View>
    )
  }
  render() {
    const { isfetched, imageIsFetched } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={{ marginBottom: 7 }}> Simple </Text>
        <ShimmerPlaceHolder autoRun={true} />
        <Line style={{ marginTop: 7, marginBottom: 7, paddingLeft: 16 }} />
        <Text style={{ marginBottom: 7 }}> 3 Rows </Text>
        {this._renderRows(this.loadingAnimated, 3, 'three-rows')}
        <Line style={{ marginTop: 7, marginBottom: 7, paddingLeft: 16 }} />
        <Text style={{ marginBottom: 7 }}> Image and Rows </Text>
        {this._renderImageAndRows()}
        <Line style={{ marginTop: 7, marginBottom: 7, paddingLeft: 16 }} />
        <Text style={{ marginBottom: 7 }}>Reverse Animated</Text>
        {this._renderReverseAnimated(this.animatedAvatarReverseLoading, 4)}

        <Line style={{ marginTop: 7, marginBottom: 7, paddingLeft: 16 }} />
        <Text style={{ marginBottom: 7 }}>Fetching image and text</Text>

        <View style={{ alignItems: 'center' }} >
          <ShimmerPlaceHolder
            ref={(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
            width={175}
            height={175}
            isDisplayChildComponent={imageIsFetched}
          >
            <Image
              style={{ width: 175, height: 175 }}
              source={{ uri: 'https://unsplash.it/300/300' }}
              onLoad={() => { this.setState({ imageIsFetched: true }); }}

            />
          </ShimmerPlaceHolder>
          <View>
            <ShimmerPlaceHolder
              ref={(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
              style={{ marginTop: 7 }}
              width={350}
              height={9}
              isDisplayChildComponent={isfetched}
            >
              <Text style={{ marginTop: 3 }}>Lorem Ipsum is simply dummy text of the printing</Text>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              ref={(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
              style={{ marginTop: 7 }}
              width={350}
              height={9}
              isDisplayChildComponent={isfetched}
            >
              <Text style={{ marginTop: 3 }}>Lorem Ipsum is simply dummy text of the printing </Text>
            </ShimmerPlaceHolder>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    marginTop: 40,
  },
});
