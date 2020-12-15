import React from "react";
import { Image, StyleSheet, View } from "react-native";

const FeatureButton = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/sample.jpg')} resizeMode='cover' />
        </View>)

}

export { FeatureButton }

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '95%',
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 10
    }
})