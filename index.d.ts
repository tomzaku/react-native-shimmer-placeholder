declare module 'react-native-shimmer-placeholder' {

    import * as React from 'react';
    import { Animated, ViewProps } from 'react-native';

    export interface ShimmerPlaceholderProps {
        width?: number | string;
        height?: number | string;
        shimmerWidthPercent?: number;
        duration?: number;
        delay?: number;
        shimmerColors?: string[];
        location?: number[];
        isReversed?: boolean;
        stopAutoRun?: boolean;
        visible?: boolean;
        children?: any;
        style?: any;
        shimmerStyle?: any;
        contentStyle?: any;
        isInteraction?: boolean;
        LinearGradient?: React.ComponentClass<any>;
        containerProps?: ViewProps
        shimmerContainerProps?: ViewProps
        childrenContainerProps?: ViewProps
    }

    class ShimmerPlaceholder extends React.Component<ShimmerPlaceholderProps, any> {
        getAnimated(): Animated.CompositeAnimation;
    }

    export const createShimmerPlaceholder = (LinearGradient?: React.ComponentClass<any>) => ShimmerPlaceholder

    export default ShimmerPlaceholder
}