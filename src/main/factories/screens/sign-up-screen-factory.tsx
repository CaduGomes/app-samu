import React from "react";
import { SignUpScreen } from "@presentation/screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthenticationNavigatorParamList } from "@main/routes/authentication-navigator";
import { makeRemoteAuthentication } from "../usecases/remote-authentication";

export type SignUpScreenNavigationProp = StackNavigationProp<
  AuthenticationNavigatorParamList,
  "SignUp"
>;

export const MakeSignUpScreen: React.FC<{
  navigation: SignUpScreenNavigationProp;
}> = ({ navigation }) => (
  <SignUpScreen useAuthentication={makeRemoteAuthentication()} />
);
