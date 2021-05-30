import { AmbulanceRequest } from "@domain/usecases";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import storage from "@react-native-firebase/storage";
// import { InvalidCredentialsError, UnexpectedError } from "@domain/errors";

export class RemoteAmbulanceRequest implements AmbulanceRequest {
  constructor(private readonly collection: string) {}

  async create(): Promise<FirebaseFirestoreTypes.DocumentReference> {
    const doc = await firestore().collection(this.collection).doc();
    await doc.set({
      createAt: firestore.Timestamp.now(),
      isOpen: true,
      images: [],
    });
    return doc;
  }

  async addImage({
    docId,
    imageName,
    imageURI,
  }: AmbulanceRequest.AddImage): Promise<string> {
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
  }: AmbulanceRequest.DeleteImage): Promise<void> {
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
  }: AmbulanceRequest.UpdateLocation): Promise<void> {
    await firestore().collection(this.collection).doc(docId).update({
      location,
    });
  }
}

export declare namespace RemoteAmbulanceRequest {
  export type Model = AmbulanceRequest.Model;
}
