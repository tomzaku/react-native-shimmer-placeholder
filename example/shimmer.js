/* @flow */

import React, { PureComponent, Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, ScrollView, FlatList} from 'react-native';

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
      const threeRowAnimated = Animated.parallel(
        this.loadingAnimated.map(animate => {
          if (animate && animate.getAnimated) {
            return animate.getAnimated();
          }
          return null;
        }),
        {
          stopTogether: false,
        },
      );
      Animated.loop(threeRowAnimated).start();
    }
  }
  runAvatarReverseAnimated() {
    this.animatedAvatarReverseLoading = this.animatedAvatarReverseLoading.slice(this.animatedAvatarReverseLoading.length - 5, this.animatedAvatarReverseLoading.length);
    if (Array.isArray(this.animatedAvatarReverseLoading) && this.animatedAvatarReverseLoading.length > 0) {
      const sequenceReverseAnimated = Animated.stagger(400,[
        this.animatedAvatarReverseLoading[0].getAnimated(), // image left
        Animated.parallel( //4 row middle
          this.animatedAvatarReverseLoading.slice(1, this.animatedAvatarReverseLoading.length-1).map(animate => {
            if (animate && animate.getAnimated) {
              return animate.getAnimated();
            }
            return null;
          }), 
          {
            stopTogether: false,
          },
        ),
        this.animatedAvatarReverseLoading[this.animatedAvatarReverseLoading.length - 1].getAnimated(), // right image
      ]
    )
    .start(()=>this.runAvatarReverseAnimated())
    // Animated.loop(sequenceReverseAnimated).start()
    }
  }
  runBigAvatarAndSomeRowsAnimated() {
    if (Array.isArray(this.bigImageAndSomeRowsAnimated) && this.bigImageAndSomeRowsAnimated.length > 0) {
      Animated.parallel(
        [
          this.bigImageAndSomeRowsAnimated[0].getAnimated(),
          ...this.bigImageAndSomeRowsAnimated.slice(1).map(animate => {
          if (animate && animate.getAnimated) {
            return animate.getAnimated();
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
      const avatarandrowsAnimated = Animated.stagger(400,[
        this.avatarLoadingAnimated[0].getAnimated(),
        Animated.parallel(
          this.avatarLoadingAnimated.slice(1).map(animate => {
            if (animate&&animate.getAnimated) {
              return animate.getAnimated();
            }
            return null
          }),
          {
            stopTogether: false
          }
        )]
      );
      Animated.loop(avatarandrowsAnimated).start();
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
  _renderRowsReverse(loadingAnimated,number,uniqueKey){
    shimmerRows=[]
    for(let index=0;index<number;index++ ){
      shimmerRows.push(
        <ShimmerPlaceHolder
          key={`loading-${index}-${uniqueKey}`}
          ref={(ref) => loadingAnimated.push(ref)}
          width={150}
          style={{ marginBottom: 7}}
          reverse

        />
      )
    }
    return(
      <View>
        {shimmerRows}
      </View>
    )
  }
  _renderImageAndRows = () => {
    this.avatarLoadingAnimated=[]
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
  _renderReverseAnimated= () => {
    // this.animatedAvatarReverseLoading = []
    return(
      <View style={{ flexDirection: 'row-reverse' }}>
        <ShimmerPlaceHolder
          ref={(ref) => this.animatedAvatarReverseLoading.push(ref)}
          width={60}
          height={60}
          style={{ marginLeft: 16, borderRadius: 30}}
          reverse
        />
        <View>
          {this._renderRowsReverse(this.animatedAvatarReverseLoading, 3, 'reverse')}
        </View>
        <ShimmerPlaceHolder
          ref={(ref) => this.animatedAvatarReverseLoading.push(ref)}
          width={60}
          height={60}
          style={{ marginLeft: 16, marginRight: 16 }}
          reverse
        />
      </View>
    )
  }
  render() {
    const { isfetched, imageIsFetched } = this.state;
    // return (
    //   <View style={{flex: 1}}>
    //     <View style={{flex: 1}}>
    //       <AnimatedLinearGradient customColors={presetColors.instagram} speed={4000} />
    //     </View>
    //     <View style={{flex: 1}}>
    //       <AnimatedLinearGradient customColors={presetColors.firefox} speed={4000} />
    //     </View>
    //     <View style={{flex: 1}}>
    //       <AnimatedLinearGradient customColors={presetColors.sunrise} speed={4000} />
    //     </View>
    //     <View style={{flex: 1}}>
    //       <AnimatedLinearGradient customColors={presetColors.instagram} speed={4000} />
    //     </View>

    //   </View>
    // )
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
        {this._renderReverseAnimated()}

        <Line style={{ marginTop: 7, marginBottom: 7, paddingLeft: 16 }} />
        <Text style={{ marginBottom: 7 }}>Fetching image and text</Text>

        <View style={{ alignItems: 'center' }} >
          <ShimmerPlaceHolder
            ref={(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
            width={200}
            height={200}
            style={{ width: 200, height: 200, borderRadius: 100 }}
            visible={imageIsFetched}
            backgroundColorBehindBorder={'white'}
          >
            <Image
              style={{ width: 200, height: 200, borderRadius: 100 }}
              source={{ uri: 'https://unsplash.it/1000/1000' }}
              onLoad={() => { this.setState({ imageIsFetched: true }); }}

            />
          </ShimmerPlaceHolder>
          <View>
            <ShimmerPlaceHolder
              ref={(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
              style={{ marginTop: 7 }}
              width={350}
              height={9}
              visible={isfetched}
            >
              <Text style={{ marginTop: 3 }}>Lorem Ipsum is simply dummy text of the printing</Text>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              ref={(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
              style={{ marginTop: 7 }}
              width={350}
              height={9}
              visible={isfetched}
            >
              <Text style={{ marginTop: 3 }}>Lorem Ipsum is simply dummy text of the printing </Text>
            </ShimmerPlaceHolder>
          </View>
        </View>
        <View>
          <FlatList
            data={new Array(45)}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            contentContainerStyle={{alignItems: 'center',}}
          />
          
        </View>
      </ScrollView>
    );
  }
  keyExtractor = (item, index) => {
    return `${index}`
  }
  renderItem = () => {
    return (
      <ShimmerPlaceHolder autoRun style={{marginVertical: 7}} height={30} width={300} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    paddingBottom: 0,
    backgroundColor: 'white',
  },
});
