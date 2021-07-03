import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MakeAmbulanceRequestScreen,
  MakeRequestChatScreen,
} from "@main/factories/screens";

export type AmbulanceRequestNavigatorParamList = {
  Request: undefined;
  Chat: {
    id: string;
  };
};

const Stack = createStackNavigator<AmbulanceRequestNavigatorParamList>();

export function AmbulanceRequestNavigator() {
  return (
    <Stack.Navigator initialRouteName="Request">
      <Stack.Screen
        name="Request"
        component={MakeAmbulanceRequestScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={MakeRequestChatScreen}
        options={{ title: "Voltar" }}
      />
    </Stack.Navigator>
  );
}
