import { MessageModel } from "@domain/models";
import { AmbulanceRequestRepository } from "@domain/repositories";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import storage from "@react-native-firebase/storage";
import * as Notifications from "expo-notifications";

export class RemoteAmbulanceRequest implements AmbulanceRequestRepository {
  constructor(private readonly collection: string) {}

  async create(): Promise<FirebaseFirestoreTypes.DocumentReference> {
    const doc = await firestore().collection(this.collection).doc();
    await doc.set({
      createAt: firestore.Timestamp.now(),
      isOpen: true,
      images: [],
      videos: [],
      location: new firestore.GeoPoint(0, 0),
    });

    firestore()
      .collection<MessageModel>("AmbulanceRequest")
      .doc(doc.id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        async (docs) => {
          const msgs: MessageModel[] = [];
          docs.docs.forEach((doc) => {
            msgs.push({
              id: doc.id,
              createdAt: doc.data()["createdAt"],
              direction: doc.data()["direction"],
              text: doc.data()["text"],
            });
          });
          if (msgs[0] && msgs[0].direction === "admin") {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Nossa mensagem",
                body: msgs[0].text,
              },
              trigger: { seconds: 2 },
            });
          }
        },
        (err) => console.log(err)
      );

    return doc;
  }

  async addImage({
    docId,
    imageName,
    imageURI,
  }: AmbulanceRequestRepository.AddImage): Promise<string> {
    const reference = await storage().ref("/images/" + imageName);

    await reference.putFile(imageURI);

    await firestore()
      .collection(this.collection)
      .doc(docId)
      .update({
        images: firestore.FieldValue.arrayUnion({
          url: await reference.getDownloadURL(),
          name: imageName,
        }),
      });

    return await reference.getDownloadURL();
  }

  async deleteImage({
    docId,
    imageName,
    imageURL,
  }: AmbulanceRequestRepository.DeleteImage): Promise<void> {
    await firestore()
      .collection(this.collection)
      .doc(docId)
      .update({
        images: firestore.FieldValue.arrayRemove({
          name: imageName,
          url: imageURL,
        }),
      });

    const reference = storage().ref("/images/" + imageName);

    await reference.delete();
  }

  async updateLocation({
    docId,
    location,
  }: AmbulanceRequestRepository.UpdateLocation): Promise<void> {
    await firestore().collection(this.collection).doc(docId).update({
      location,
    });
  }

  async addVideo({
    docId,
    videoName,
    videoURI,
  }: AmbulanceRequestRepository.AddVideo): Promise<string> {
    const reference = await storage().ref("/videos/" + videoName);

    await reference.putFile(videoURI);

    await firestore()
      .collection(this.collection)
      .doc(docId)
      .update({
        videos: firestore.FieldValue.arrayUnion({
          url: await reference.getDownloadURL(),
          name: videoName,
        }),
      });

    return await reference.getDownloadURL();
  }

  async deleteVideo({
    docId,
    videoName,
    videoURL,
  }: AmbulanceRequestRepository.DeleteVideo): Promise<void> {
    await firestore()
      .collection(this.collection)
      .doc(docId)
      .update({
        videos: firestore.FieldValue.arrayRemove({
          name: videoName,
          url: videoURL,
        }),
      });

    const reference = storage().ref("/videos/" + videoName);

    await reference.delete();
  }
}

export declare namespace RemoteAmbulanceRequest {
  export type Model = AmbulanceRequestRepository.Model;
}
