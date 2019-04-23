declare module 'react-native-shimmer-placeholder' {
    import React from 'react';
    type Props = {
        width?: number | string,
        height?: number | string,
        widthShimmer?: number,
        duration?: number,
        delay?: number,
        colorShimmer?: string[],
        reverse?: boolean,
        autoRun?: boolean,
        visible?: boolean,
        children?: any,
        style?: any,
        backgroundColorBehindBorder?: string,
        hasBorder?: boolean,
        isInteraction?: boolean,
    }
    declare class MyComponent extends React.Component<Props, any> {}
    export default MyComponent
}
