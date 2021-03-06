import React from "react";
import { Text, View } from "react-native";
import { HomeScreenNavigationProp } from "@main/factories/screens";
import auth from "@react-native-firebase/auth";

type Props = {
  navigation: HomeScreenNavigationProp;
};

import styles from "./styles";
import { CustomButton } from "@presentation/components";

async function signOutHandler() {
  await auth().signOut();
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo ao APP Samu!</Text>
      <CustomButton
        title="Abrir chamado"
        onPress={() => navigation.navigate("AmbulanceRequest")}
      />
      <CustomButton title="Deslogar" onPress={signOutHandler} />
    </View>
  );
};

export default HomeScreen;
