import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type AmbulanceRequestModel = {
  date: FirebaseFirestoreTypes.Timestamp;
  images: string[];
  location: FirebaseFirestoreTypes.GeoPoint;
  isOpen: boolean;
};
