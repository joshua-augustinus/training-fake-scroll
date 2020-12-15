import React, { useRef, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface Props {
    scrollY: any,
    index: number,
    onPress: () => void,
    stateTransition: any
}

export const FEATURE_BUTTON_HEIGHT = 110;
const IMAGE_HEIGHT = FEATURE_BUTTON_HEIGHT - 10;

const FeatureButton = (props: Props) => {
    const fullWidth = useWindowDimensions().width;

    let y = Animated.add(props.index * FEATURE_BUTTON_HEIGHT, Animated.multiply(1, props.scrollY));
    const transform = [{
        translateY: y,

    }, {
        translateX: props.stateTransition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, props.index === 1 ? 0 : -fullWidth]
        })
    },
    { scale: 0.95 },

    ];

    const borderRadius = props.stateTransition.interpolate({
        inputRange: [0, 1],
        outputRange: [10, props.index === 1 ? 0 : 10]
    })

    return (
        <View style={StyleSheet.absoluteFill}>

            <Animated.View style={{
                ...styles.container, transform: transform
            }}>
                <TouchableOpacity onPress={props.onPress} >
                    <Animated.Image style={{ ...styles.image, width: fullWidth, borderRadius: borderRadius }} source={require('../assets/sample.jpg')} />

                </TouchableOpacity>
            </Animated.View>
        </View>)

}

export { FeatureButton }

const styles = StyleSheet.create({
    container: {
        height: FEATURE_BUTTON_HEIGHT,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    image: {


        height: IMAGE_HEIGHT,
    }
})