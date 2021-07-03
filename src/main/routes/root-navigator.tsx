import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabNavigator } from "./bottom-tab-navigator";
import { AmbulanceRequestNavigator } from "./ambulance-request-navigator";

export type RootNavigatorParamList = {
  Home: undefined;
  AmbulanceRequest: undefined;
};

const Stack = createStackNavigator<RootNavigatorParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AmbulanceRequest"
        component={AmbulanceRequestNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
