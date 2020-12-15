import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import { FeatureButton, FEATURE_BUTTON_HEIGHT } from '@src/components/FeatureButton';
import Animated, { Easing } from 'react-native-reanimated';

/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

const MasterScreen = (props: Props) => {
    const stateTransition = useRef(new Animated.Value(0)).current;
    const [y, setY] = useState(new Animated.Value(0));
    const scrollY = useRef(new Animated.Value(0));
    const [disablePanResponder, setDisablePanResponder] = useState(true);

    useEffect(() => {

    }, []);

    const onMenuPress = () => {
        Animated.timing(y, {
            toValue: 0,
            duration: 500,
            easing: Easing.ease

        }).start();
    }

    const onReset = () => {

        const animation1 = Animated.timing(scrollY.current, {
            toValue: 0,
            duration: 500,
            easing: Easing.ease
        }).start();

        const animation2 = Animated.timing(stateTransition, {
            toValue: 0,
            duration: 500,
            easing: Easing.ease

        }).start();

        setDisablePanResponder(false);



    }

    const onPress = (index: number) => {

        const animation1 = Animated.timing(scrollY.current, {
            toValue: 0 - index * FEATURE_BUTTON_HEIGHT,
            duration: 500,
            easing: Easing.ease

        }).start();

        const animation2 = Animated.timing(stateTransition, {
            easing: Easing.ease,
            toValue: 1,
            duration: 500
        }).start();

        setDisablePanResponder(true);



    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center', elevation: 1000 }}>


                <TouchableOpacity style={{ backgroundColor: 'yellow', elevation: 1000, zIndex: 1000 }}
                    onPress={onReset}>
                    <Text>Reset</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <FeatureButton scrollY={scrollY.current} index={0} onPress={() => onPress(0)} stateTransition={stateTransition} />
                <FeatureButton scrollY={scrollY.current} index={1} onPress={() => onPress(1)} stateTransition={stateTransition} />


                {!disablePanResponder && <Animated.ScrollView style={StyleSheet.absoluteFill} disableScrollViewPanResponder={disablePanResponder}
                    contentContainerStyle={{ height: 5000 }}
                    scrollEventThrottle={16}
                    onScroll={
                        Animated.event(
                            [
                                { nativeEvent: { contentOffset: { y: scrollY.current } } }
                            ]
                        )
                    }

                    decelerationRate="fast"
                />}
            </View>
        </SafeAreaView>

    );

}

MasterScreen.navigationOptions = {}

export { MasterScreen }