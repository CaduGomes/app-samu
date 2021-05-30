import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "@presentation/screens";
import MakeAmbulanceRequestScreen from "@main/factories/screens/ambulance-request-screen-factory";

export type MainNavigatorParamList = {
  Home: undefined;
  AmbulanceRequest: undefined;
};

const Stack = createStackNavigator<MainNavigatorParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AmbulanceRequest"
        component={MakeAmbulanceRequestScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
