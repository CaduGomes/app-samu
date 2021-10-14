import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import * as Location from "expo-location";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import * as Notifications from "expo-notifications";
import { QuestionModal, TakePicture, RecordVideo } from "./components";
import styles from "./styles";
import { AmbulanceRequestRepository } from "@domain/repositories";
import { AmbulanceRequestScreenNavigationProp } from "@main/factories/screens";
import { CustomButton } from "@presentation/components";

type Props = {
  useAmbulanceRequest: AmbulanceRequestRepository;
  navigation: AmbulanceRequestScreenNavigationProp;
};

const AmbulanceRequestScreen: React.FC<Props> = ({
  useAmbulanceRequest,
  navigation,
}) => {
  const [firestoreDocument, setFirestoreDocument] =
    useState<FirebaseFirestoreTypes.DocumentReference | null>(null);
  const [firstAnwser, setFirstAnwser] = useState<string | null>(null);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();

      Alert.alert(
        "Cancelar chamado?",
        "Caso você saia seu chamado será cancelado!",
        [
          { text: "Ficar", style: "cancel", onPress: () => {} },
          {
            text: "Sair mesmo assim",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
  }, [navigation]);

  useEffect(() => {
    async function createAmbulanceRequest() {
      if (firstAnwser && !firestoreDocument) {
        const docReference = await useAmbulanceRequest.create();
        setFirestoreDocument(docReference);
      }
    }
    createAmbulanceRequest();
  }, [firstAnwser]);

  useEffect(() => {
    let isSubscribed = true;
    async function requestLocationPermission() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === Location.PermissionStatus.GRANTED) {
        const LocationOption: Location.LocationOptions = {
          timeInterval: 5000,
          accuracy: Location.Accuracy.BestForNavigation,
        };

        Location.watchPositionAsync(LocationOption, async (result) => {
          if (firestoreDocument) {
            if (isSubscribed) {
              await useAmbulanceRequest.updateLocation({
                docId: firestoreDocument.id,
                location: new firestore.GeoPoint(
                  result.coords.latitude,
                  result.coords.longitude
                ),
              });
            }
          }
        });
      }
    }
    requestLocationPermission();

    return () => {
      isSubscribed = false;
    };
  }, [firestoreDocument]);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  return (
    <View style={styles.container}>
      <QuestionModal setResponse={setFirstAnwser} show={!firstAnwser} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Uma ambulância foi requisitada!</Text>
        <Text style={styles.subtitle}>Sua localização está sendo enviada</Text>
        <Text style={styles.subtitle}>Não feche o aplicativo!</Text>
      </View>
      <View>
        <Text>Chat com um médico</Text>
        <CustomButton
          title="Abrir Chat"
          onPress={() =>
            navigation.navigate("Chat", { id: firestoreDocument?.id ?? "" })
          }
        />
      </View>
      <TakePicture
        docId={firestoreDocument?.id ?? ""}
        useAmbulanceRequest={useAmbulanceRequest}
      />
      <RecordVideo
        docId={firestoreDocument?.id ?? ""}
        useAmbulanceRequest={useAmbulanceRequest}
      />
    </View>
  );
};

export default AmbulanceRequestScreen;
