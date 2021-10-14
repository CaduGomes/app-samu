import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator, AuthenticationNavigator } from "@main/routes";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
      });
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <RootNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  );
}
