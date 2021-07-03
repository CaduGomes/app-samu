import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { AmbulanceRequestModel } from "../models";

export interface AmbulanceRequestRepository {
  create: () => Promise<FirebaseFirestoreTypes.DocumentReference>;
  addImage: (params: AmbulanceRequestRepository.AddImage) => Promise<string>;
  addVideo: (params: AmbulanceRequestRepository.AddVideo) => Promise<string>;
  deleteVideo: (
    params: AmbulanceRequestRepository.DeleteVideo
  ) => Promise<void>;
  deleteImage: (
    params: AmbulanceRequestRepository.DeleteImage
  ) => Promise<void>;
  updateLocation: (
    params: AmbulanceRequestRepository.UpdateLocation
  ) => Promise<void>;
}

export declare namespace AmbulanceRequestRepository {
  export type AddImage = {
    docId: string;
    imageURI: string;
    imageName: string;
  };
  export type AddVideo = {
    docId: string;
    videoURI: string;
    videoName: string;
  };
  export type DeleteImage = {
    imageName: string;
    docId: string;
    imageURL: string;
  };
  export type DeleteVideo = {
    videoName: string;
    docId: string;
    videoURL: string;
  };
  export type UpdateLocation = {
    docId: string;
    location: FirebaseFirestoreTypes.GeoPoint;
  };
  export type Model = AmbulanceRequestModel;
}
