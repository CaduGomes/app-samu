import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { AmbulanceRequestModel } from "../models";

export interface AmbulanceRequest {
  create: () => Promise<FirebaseFirestoreTypes.DocumentReference>;
  addImage: (params: AmbulanceRequest.AddImage) => Promise<string>;
  deleteImage: (params: AmbulanceRequest.DeleteImage) => Promise<void>;
  updateLocation: (params: AmbulanceRequest.UpdateLocation) => Promise<void>;
}

export declare namespace AmbulanceRequest {
  export type AddImage = {
    docId: string;
    imageURI: string;
    imageName: string;
  };
  export type DeleteImage = {
    imageName: string;
    docId: string;
    imageURL: string;
  };
  export type UpdateLocation = {
    docId: string;
    location: FirebaseFirestoreTypes.GeoPoint;
  };
  export type Model = AmbulanceRequestModel;
}
