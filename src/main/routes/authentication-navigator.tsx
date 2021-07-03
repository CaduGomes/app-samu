import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MakeSignUpScreen, MakeSignInScreen } from "@main/factories/screens";

export type AuthenticationNavigatorParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createStackNavigator<AuthenticationNavigatorParamList>();

export function AuthenticationNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={MakeSignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={MakeSignUpScreen}
        options={{ title: "Voltar" }}
      />
    </Stack.Navigator>
  );
}
