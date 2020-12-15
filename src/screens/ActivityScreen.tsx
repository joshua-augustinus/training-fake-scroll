import { ArticleHeader } from '@src/components/ArticleHeader';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';


type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}


const ActivityScreen = (props: Props) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity style={{ backgroundColor: 'yellow' }}
                    onPress={() => { }}>
                    <Text>Menu</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView>
                    <ArticleHeader />

                </ScrollView>
            </View>
        </SafeAreaView>

    );

}

export { ActivityScreen }