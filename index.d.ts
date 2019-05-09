declare module 'react-native-shimmer-placeholder' {
    import React from 'react';
    import { Animated } from 'react-native';
    interface Props {
        width?: number | string;
        height?: number | string;
        widthShimmer?: number;
        duration?: number;
        delay?: number;
        colorShimmer?: string[];
        reverse?: boolean;
        autoRun?: boolean;
        visible?: boolean;
        children?: any;
        style?: any;
        backgroundColorBehindBorder?: string;
        hasBorder?: boolean;
        isInteraction?: boolean;
    }
    export default class ShimmerPlaceHolder extends React.Component<Props, any> {
        getAnimated(): Animated.CompositeAnimation;
    }
}
