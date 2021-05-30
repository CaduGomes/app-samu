import { RemoteAmbulanceRequest } from "@data/usecases";
import { AmbulanceRequest } from "@domain/usecases";

export const makeRemoteAmbulanceRequest = (): AmbulanceRequest =>
  new RemoteAmbulanceRequest("AmbulanceRequest");
