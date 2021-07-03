import React from "react";
import { AmbulanceRequestScreen } from "@presentation/screens";
import { makeAmbulanceRequestUseCase } from "@main/factories/usecases";
import { StackNavigationProp } from "@react-navigation/stack";
import { AmbulanceRequestNavigatorParamList } from "@main/routes";

export type AmbulanceRequestScreenNavigationProp = StackNavigationProp<
  AmbulanceRequestNavigatorParamList,
  "Request"
>;

export const MakeAmbulanceRequestScreen: React.FC<{
  navigation: AmbulanceRequestScreenNavigationProp;
}> = ({ navigation }) => (
  <AmbulanceRequestScreen
    useAmbulanceRequest={makeAmbulanceRequestUseCase()}
    navigation={navigation}
  />
);
