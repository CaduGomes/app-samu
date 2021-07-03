import { RootNavigatorParamList, MainNavigatorParamList } from "@main/routes";
import { HomeScreen } from "@presentation/screens";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainNavigatorParamList, "Home">,
  StackNavigationProp<RootNavigatorParamList, "Home">
>;

export const MakeHomeScreen: React.FC<{
  navigation: HomeScreenNavigationProp;
}> = ({ navigation }) => <HomeScreen navigation={navigation} />;
