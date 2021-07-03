import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator, AuthenticationNavigator } from "@main/routes";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  // }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
      });
    return subscriber; // unsubscribe on unmount
  }, []);

  // useEffect(() => {
  //   requestUserPermission();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     if (remoteMessage) {
  //       await Notifications.scheduleNotificationAsync({
  //         content: {
  //           title: "Nossa mensagem",
  //           body: remoteMessage.data?.text,
  //         },
  //         trigger: { seconds: 2 },
  //       });
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <RootNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  );
}
