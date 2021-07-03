import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type AmbulanceRequestModel = {
  createAt: FirebaseFirestoreTypes.Timestamp;
  images: [
    {
      name: string;
      url: string;
    }
  ];
  location: FirebaseFirestoreTypes.GeoPoint;
  isOpen: boolean;
};
