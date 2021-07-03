import React from "react";
import SignInScreen from "@presentation/screens/sign-in";
import { makeAuthUseCase } from "@main/factories/usecases";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationNavigatorParamList } from "@main/routes/authentication-navigator";

export type SignInScreenNavigationProp = StackNavigationProp<
  AuthenticationNavigatorParamList,
  "SignIn"
>;

export const MakeSignInScreen: React.FC<{
  navigation: SignInScreenNavigationProp;
}> = ({ navigation }) => (
  <SignInScreen navigation={navigation} useAuthentication={makeAuthUseCase()} />
);
