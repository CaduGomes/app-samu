import { RemoteAmbulanceRequest } from "@data/usecases";

export const makeAmbulanceRequestUseCase = () =>
  new RemoteAmbulanceRequest("AmbulanceRequest");
