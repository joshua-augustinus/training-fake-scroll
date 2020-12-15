import React, { useRef, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface Props {
    scrollY: any,
    index: number,
    onPress: () => void,
    stateTransition: any,
    selectedIndex: number
}

export const FEATURE_BUTTON_HEIGHT = 150;
const ARTICLE_HEADER_HEIGHT = 300;

const FeatureButton = (props: Props) => {
    const fullWidth = useWindowDimensions().width;

    let y = Animated.add(props.index * FEATURE_BUTTON_HEIGHT, Animated.multiply(1, props.scrollY));

    /**
     * Returns value depending on if selected or not
     * @param whenSelected 
     * @param otherwise 
     */
    const getValue = (whenSelected: number, otherwise: number) => {
        return props.index === props.selectedIndex ? whenSelected : otherwise;
    }

    const transform = [{
        translateY: y,

    }, {
        translateX: props.stateTransition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, props.index === props.selectedIndex ? 0 : -fullWidth]
        })
    },
    {
        scale: props.stateTransition.interpolate({
            inputRange: [0, 1],
            outputRange: [0.90, props.index === props.selectedIndex ? 1 : 0.95]
        })
    },

    ];

    const borderRadius = props.stateTransition.interpolate({
        inputRange: [0, 1],
        outputRange: [10, props.index === props.selectedIndex ? 0 : 10]
    })


    const height = props.stateTransition.interpolate({
        inputRange: [0, 1],
        outputRange: [FEATURE_BUTTON_HEIGHT, getValue(ARTICLE_HEADER_HEIGHT, FEATURE_BUTTON_HEIGHT)]
    })

    const opacity = props.stateTransition.interpolate({
        inputRange: [0, 0.4, 1],
        outputRange: [1, getValue(1, 0), getValue(1, 0)]
    })

    return (
        <View style={StyleSheet.absoluteFill}>

            <Animated.View style={{
                ...styles.container, transform: transform, opacity: opacity
            }}>
                <TouchableOpacity onPress={props.onPress} >
                    <Animated.Image style={{ ...styles.image, width: fullWidth, height: height, borderRadius: borderRadius }} source={require('../assets/sample.jpg')} />

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
        width: '100%',

    }
})