import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  MakeHomeScreen,
  MakeSettingsScreen,
  MakeUserProfileScreen,
} from "@main/factories/screens";

export type MainNavigatorParamList = {
  Home: undefined;
  UserProfile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "UserProfile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={MakeHomeScreen}
        options={{ tabBarLabel: "Início" }}
      />
      <Tab.Screen
        name="UserProfile"
        component={MakeUserProfileScreen}
        options={{ tabBarLabel: "Seus Dados" }}
      />
      <Tab.Screen
        name="Settings"
        component={MakeSettingsScreen}
        options={{ tabBarLabel: "Configurações" }}
      />
    </Tab.Navigator>
  );
}
