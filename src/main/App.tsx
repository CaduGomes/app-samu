import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationNavigator, MainNavigator } from "@main/routes";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  );
}
