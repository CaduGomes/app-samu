import React from "react";
import SignInScreen from "@presentation/screens/sign-in";
import { makeRemoteAuthentication } from "../usecases/remote-authentication";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationNavigatorParamList } from "@main/routes/authentication-navigator";

export type SignInScreenNavigationProp = StackNavigationProp<
  AuthenticationNavigatorParamList,
  "SignIn"
>;

export const MakeSignInScreen: React.FC<{
  navigation: SignInScreenNavigationProp;
}> = ({ navigation }) => (
  <SignInScreen
    navigation={navigation}
    useAuthentication={makeRemoteAuthentication()}
  />
);
