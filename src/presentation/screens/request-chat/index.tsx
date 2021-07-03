import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Button, Text } from "react-native";
import firestore from "@react-native-firebase/firestore";
import * as Notifications from "expo-notifications";

import {
  AmbulanceRequestScreenNavigationProp,
  RequestChatScreenRouteProp,
} from "@main/factories/screens";
import { MessageModel } from "@domain/models";
import { Message } from "./components";
import styles from "./styles";

type Props = {
  navigation: AmbulanceRequestScreenNavigationProp;
  route: RequestChatScreenRouteProp;
};

const RequestChatScreen: React.FC<Props> = ({ navigation, route }) => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const subscriber = firestore()
      .collection<MessageModel>("AmbulanceRequest")
      .doc(route.params.id)
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
          setMessages(msgs);
        },
        (err) => console.log(err)
      );

    Notifications.cancelAllScheduledNotificationsAsync();

    return () => subscriber();
  }, []);

  async function sendMessageHandler() {
    const msg = {
      createdAt: firestore.FieldValue.serverTimestamp(),
      direction: "client",
      text,
    };

    await firestore()
      .collection<MessageModel>("AmbulanceRequest")
      .doc(route.params.id)
      .collection("messages")
      .add(msg);
    setText("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Você está conversando com um médico!</Text>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          showsVerticalScrollIndicator
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={(msg) => (
            <Message index={msg.index} key={`msg-${msg.index}`} {...msg.item} />
          )}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite uma mensagem"
            autoFocus
            onChangeText={setText}
            value={text}
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={sendMessageHandler} title="Enviar" />
        </View>
      </View>
    </View>
  );
};

export default RequestChatScreen;