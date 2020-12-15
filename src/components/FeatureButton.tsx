import React, { useRef, useState } from "react";
import { Animated, Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    scrollY: Animated.Value,
    index: number,
    onPress: () => void,
    stateTransition: Animated.Value
}

export const FEATURE_BUTTON_HEIGHT = 110;
const IMAGE_HEIGHT = FEATURE_BUTTON_HEIGHT - 10;

const FeatureButton = (props: Props) => {
    const fullWidth = useWindowDimensions().width;

    const width = fullWidth * 0.9;
    let y = Animated.add(props.index * FEATURE_BUTTON_HEIGHT, Animated.multiply(1, props.scrollY));
    const transform = [{
        translateY: y,

    }, {
        translateX: props.stateTransition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, props.index === 1 ? 0 : -fullWidth]
        })
    }];

    return (
        <View style={StyleSheet.absoluteFill}>

            <Animated.View style={{
                ...styles.container, transform: transform
            }}>
                <TouchableOpacity onPress={props.onPress} >
                    <Image style={{ ...styles.image, width: width }} source={require('../assets/sample.jpg')} />

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
        justifyContent: 'center'
    },
    image: {

        borderRadius: 10,
        height: IMAGE_HEIGHT,
    }
})