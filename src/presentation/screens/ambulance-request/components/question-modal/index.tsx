import React from "react";
import { View, Text, Modal } from "react-native";
import { CustomButton } from "@presentation/components";

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
          <CustomButton title="Sim" onPress={() => setResponse("sim")} />
          <CustomButton title="Não" onPress={() => setResponse("nao")} />
        </View>
      </View>
    </Modal>
  );
};
