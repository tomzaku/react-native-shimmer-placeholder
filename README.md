<h2 align="center">
  React Native Shimmer Placeholder
</h2>
<h5 align="center">
Placeholder for both IOS and Android
</h5>
<p align="center">
<img src="./example.gif">
</p>

## Get Started

### Installation
#### Step 1: Install react-native-linear-gradient

`npm i react-native-linear-gradient --save && react-native link react-native-linear-gradient`

or

`yarn add react-native-linear-gradient --save && react-native link react-native-linear-gradient`

#### Step 2: Install this package

`npm i react-native-shimmer-placeholder --save`

or

`yarn add react-native-shimmer-placeholder`

### Usage

#### Simple
``` js
import ShimmerPlaceHolder from './ShimmerPlaceholder.js'

<ShimmerPlaceHolder autoRun={true} />

```

#### Connect more components

``` js
componentDidMount(){
  this.runPlaceHolder()
}
runPlaceHolder() {
  if (Array.isArray(this.loadingAnimated)&&this.loadingAnimated.length>0) {
    Animated.parallel(
      this.loadingAnimated.map(animate=> {
        if (animate&&animate.runAnimated) {
          return animate.runAnimated()
        }
        return null
      }),
      {
        stopTogether: false
      }
    ).start(() => {
        this.runAnimated()
    })
  }
}
_renderRows(loadingAnimated,numberRow,uniqueKey){
  shimmerRows=[]
  for(let index=0;index<numberRow;index++ ){
    shimmerRows.push(
      <ShimmerPlaceHolder
          key={`loading-${index}-${uniqueKey}`}
          ref = {(ref) => loadingAnimated.push(ref)}
          style={{marginBottom: 7}}
      />
    )
  }
  return(
    <View>
      {shimmerRows}
    </View>
  )
}
render(){
  this.loadingAnimated=[]
  return(
    {this._renderRows(this.loadingAnimated,3,'3rows')}
  )
}
```

More Detail see [this](https://github.com/tomzaku/react-native-shimmer-placeholder/blob/master/example/shimmer.js)

### Props

| Prop | Description | Default |
|---|---|---|
|**`animating`**|With of row|false|
|**`style`**|Styles applied to the container of Shimmer Placeholder|`{backgroundColor: '#ebebeb',overflow: 'hidden'}`|
|**`width`**|With of row|200|
|**`height`**|height of row|15|
|**`widthLine`**|width of shimmer|90|
|**`reverse`**|Reverse |`true`|
|**`autoRun`**|Run shimmer animated at begin |`true`|
|**`colorShimmer`**|Color of the shimmer. |*Inherited*|

### Methods
| Method | Description |
|---|---|
|**`runAnimated`**|Run shimmer animated right now |

### Contribute
Contact me if something wrong
Give me a star if it's helpful
