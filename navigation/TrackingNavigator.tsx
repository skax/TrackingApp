import React from 'react';
import { Platform } from 'react-native'; 
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../components/home/HomeScreen';
import TrackScreen from '../components/home/TracksScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import PlotScreen from '../components/home/PlotScreen';

const TracksNavigator = createStackNavigator({
    Menu: {
        screen: TrackScreen

    },
    Detail: {
        screen: PlotScreen
    }

});

const tabScreenConfig: any = {
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarColor: 'red',
            tabBarLabel: 'Home'
        }
    },
    Tracks: TracksNavigator
}




const TracksTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig) : createBottomTabNavigator(tabScreenConfig);



export default createAppContainer(TracksTabNavigator);


/*
{ 
        screen: TrackScreen,
        navigationOptions: {
            tabBarColor: 'green',
            tabBarLabel: 'Tracks' 
        }
    } 
*/