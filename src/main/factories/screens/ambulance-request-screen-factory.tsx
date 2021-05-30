import React from "react";
import { AmbulanceRequestScreen } from "@presentation/screens";
import { makeRemoteAmbulanceRequest } from "../usecases/remote-ambulance-request";

const MakeAmbulanceRequestScreen: React.FC = () => (
  <AmbulanceRequestScreen useAmbulanceRequest={makeRemoteAmbulanceRequest()} />
);

export default MakeAmbulanceRequestScreen;
