import React from "react";
import { Button, Text, View } from "react-native";
import { HomeScreenNavigationProp } from "@main/factories/screens";
import auth from "@react-native-firebase/auth";

type Props = {
  navigation: HomeScreenNavigationProp;
};

import styles from "./styles";

async function signOutHandler() {
  await auth().signOut();
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo ao APP Samu!</Text>
      <Button
        title="Abrir chamado"
        onPress={() => navigation.navigate("AmbulanceRequest")}
      />
      <Button title="Deslogar" onPress={signOutHandler} />
    </View>
  );
};

export default HomeScreen;
