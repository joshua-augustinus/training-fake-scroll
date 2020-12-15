import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, StyleSheet, Animated } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import { FeatureButton } from '@src/components/FeatureButton';

/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

const MasterScreen = (props: Props) => {

    const [y, setY] = useState(new Animated.Value(0));
    const scrollY = useRef(null);

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
        Animated.timing(y, {
            useNativeDriver: true,
            toValue: scrollY.current,
            duration: 500
        }).start();
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center', elevation: 1000 }}>

                <TouchableOpacity style={{ backgroundColor: 'yellow' }}
                    onPress={() => onMenuPress()}>
                    <Text>Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'yellow' }}
                    onPress={onReset}>
                    <Text>Reset</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <FeatureButton scrollY={y} />

                <Animated.ScrollView style={StyleSheet.absoluteFill}
                    contentContainerStyle={{ height: 5000 }}
                    scrollEventThrottle={16}
                    onScroll={event => {

                        scrollY.current = event.nativeEvent.contentOffset.y;
                        setY(new Animated.Value(event.nativeEvent.contentOffset.y))
                    }}

                    decelerationRate="fast"
                />
            </View>
        </SafeAreaView>

    );

}

MasterScreen.navigationOptions = {}

export { MasterScreen }