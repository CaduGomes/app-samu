import { MainNavigatorParamList } from "@main/routes/main-navigator";
import { HomeScreen } from "@presentation/screens";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";

export type HomeScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamList,
  "Home"
>;

export const MakeHomeScreen: React.FC<{
  navigation: HomeScreenNavigationProp;
}> = ({ navigation }) => <HomeScreen navigation={navigation} />;
