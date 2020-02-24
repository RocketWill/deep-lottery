/**
 * App.js
 *
 * Root component of the app, 
 * responsible for setting up routes.
 *
*/

// Libs
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";



// Components
import GameSelect from './src/GameSelect';
import DaLetouNavigator from './src/Daletou/Navigation';

/**
 * createStackNavigator
 *
 * Creates a stack of our routes.
 *
*/
const Navigator = createStackNavigator({
    "請選擇遊戲": { screen: GameSelect },
    "大樂透": { screen: DaLetouNavigator },
});

/**
 * createAppContainer
 *
 * Responsible for managing app state and linking
 * the top-level navigator to the app environment.
 *
*/
const App = createAppContainer(Navigator);

export default App;