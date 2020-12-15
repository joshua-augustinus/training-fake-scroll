import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, StyleSheet, Animated } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import { FeatureButton, FEATURE_BUTTON_HEIGHT } from '@src/components/FeatureButton';

/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

const MasterScreen = (props: Props) => {
    const stateTransition = useRef(new Animated.Value(0)).current;
    const [y, setY] = useState(new Animated.Value(0));
    const scrollY = useRef(null);
    const [disablePanResponder, setDisablePanResponder] = useState(true);

    useEffect(() => {

    }, []);

    const onMenuPress = () => {
        Animated.timing(y, {
            useNativeDriver: true,
            toValue: 0,
            duration: 500
        }).start();
    }

    const onReset = () => {

        const animation1 = Animated.timing(y, {
            useNativeDriver: true,
            toValue: scrollY.current,
            duration: 500
        })

        const animation2 = Animated.timing(stateTransition, {
            useNativeDriver: true,
            toValue: 0,
            duration: 500
        });

        Animated.parallel([animation1, animation2]).start(() => {
            setDisablePanResponder(false);

        });

    }

    const onPress = (index: number) => {

        const animation1 = Animated.timing(y, {
            useNativeDriver: true,
            toValue: 0 - index * FEATURE_BUTTON_HEIGHT,
            duration: 500
        })

        const animation2 = Animated.timing(stateTransition, {
            useNativeDriver: true,
            toValue: 1,
            duration: 500
        });

        Animated.parallel([animation1, animation2]).start(() => {
            setDisablePanResponder(true);

        });

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

                <FeatureButton scrollY={y} index={0} onPress={() => onPress(0)} stateTransition={stateTransition} />
                <FeatureButton scrollY={y} index={1} onPress={() => onPress(1)} stateTransition={stateTransition} />


                {!disablePanResponder && <Animated.ScrollView style={StyleSheet.absoluteFill} disableScrollViewPanResponder={disablePanResponder}
                    contentContainerStyle={{ height: 5000 }}
                    scrollEventThrottle={16}
                    onScroll={event => {

                        scrollY.current = event.nativeEvent.contentOffset.y;
                        setY(new Animated.Value(event.nativeEvent.contentOffset.y))
                    }}

                    decelerationRate="fast"
                />}
            </View>
        </SafeAreaView>

    );

}

MasterScreen.navigationOptions = {}

export { MasterScreen }