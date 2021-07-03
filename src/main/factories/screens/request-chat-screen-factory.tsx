import React from "react";
import { RequestChat } from "@presentation/screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { AmbulanceRequestNavigatorParamList } from "@main/routes";
import { RouteProp } from "@react-navigation/native";

export type RequestChatScreenNavigationProp = StackNavigationProp<
  AmbulanceRequestNavigatorParamList,
  "Request"
>;

export type RequestChatScreenRouteProp = RouteProp<
  AmbulanceRequestNavigatorParamList,
  "Chat"
>;

export const MakeRequestChatScreen: React.FC<{
  navigation: RequestChatScreenNavigationProp;
  route: RequestChatScreenRouteProp;
}> = ({ navigation, route }) => (
  <RequestChat navigation={navigation} route={route} />
);
