import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type DirectionModel = "admin" | "client";

export type MessageModel = {
  id: string;
  text: string;
  direction: DirectionModel;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};
