import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { Component } from "react";
import GameSelect from "./GameSelect";
import Navigation from "./Daletou/Navigation";

const Stack = createStackNavigator();

export default class MainNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={GameSelect} />
          <Stack.Screen name="Notifications" component={Navigation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
