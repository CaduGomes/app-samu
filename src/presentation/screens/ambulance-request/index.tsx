import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import * as Location from "expo-location";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import { TakePicture } from "./components";
import styles from "./styles";
import { AmbulanceRequest } from "@domain/usecases";

type Props = {
  useAmbulanceRequest: AmbulanceRequest;
};

const AmbulanceRequestScreen: React.FC<Props> = ({ useAmbulanceRequest }) => {
  const [firestoreDocument, setFirestoreDocument] =
    useState<FirebaseFirestoreTypes.DocumentReference | null>(null);

  useEffect(() => {
    async function createAmbulanceRequest() {
      const docReference = await useAmbulanceRequest.create();
      setFirestoreDocument(docReference);
    }
    // createAmbulanceRequest();
  }, []);

  useEffect(() => {
    async function requestLocationPermission() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === Location.PermissionStatus.GRANTED) {
        const LocationOption: Location.LocationOptions = {
          timeInterval: 20000,
          accuracy: Location.Accuracy.BestForNavigation,
        };

        Location.watchPositionAsync(LocationOption, async (result) => {
          if (firestoreDocument) {
            await useAmbulanceRequest.updateLocation({
              docId: firestoreDocument.id,
              location: new firestore.GeoPoint(
                result.coords.latitude,
                result.coords.longitude
              ),
            });
          }
        });
      }
    }
    // requestLocationPermission();
  }, [firestoreDocument]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Uma ambulância foi requisitada!</Text>
        <Text style={styles.subtitle}>Sua localização está sendo enviada</Text>
        <Text style={styles.subtitle}>Não feche o aplicativo!</Text>
      </View>
      <TakePicture
        docId={firestoreDocument?.id ?? ""}
        useAmbulanceRequest={useAmbulanceRequest}
      />
    </View>
  );
};

export default AmbulanceRequestScreen;
