import React, { useRef, useState } from "react";
import { Animated, Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    scrollY: any
}

const FeatureButton = (props: Props) => {
    const width = useWindowDimensions().width * 0.9;
    let y = Animated.multiply(1, props.scrollY);
    const transform = [{
        translateY: y
    }];

    return (
        <Animated.View style={{ ...styles.container, transform: transform }}>
            <TouchableOpacity   >
                <Image style={{ ...styles.image, width: width }} source={require('../assets/sample.jpg')} resizeMode='cover' />

            </TouchableOpacity>
        </Animated.View>)

}

export { FeatureButton }

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        alignItems: 'center'
    },
    image: {

        borderRadius: 10,
        height: '100%',
    }
})