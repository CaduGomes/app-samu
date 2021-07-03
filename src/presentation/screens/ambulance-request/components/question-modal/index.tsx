import React from "react";
import { View, Text, Button, Modal } from "react-native";

import styles from "./styles";

type Props = {
  show: boolean;
  setResponse: (value: string) => void;
};

export const QuestionModal: React.FC<Props> = ({ show, setResponse }) => {
  return (
    <Modal animationType="slide" visible={show}>
      <View style={styles.container}>
        <Text style={styles.title}>
          O atendimento é para o dono deste celular?
        </Text>
        <View style={styles.button}>
          <Button title="Sim" onPress={() => setResponse("sim")} />
          <Button title="Não" onPress={() => setResponse("nao")} />
        </View>
      </View>
    </Modal>
  );
};
