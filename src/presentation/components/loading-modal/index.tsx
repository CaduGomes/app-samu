import React from "react";
import { ActivityIndicator, Text, View, Modal } from "react-native";

import styles from "./styles";
type Props = {
  show: boolean;
};

export const LoadingModal: React.FC<Props> = ({ show }) => {
  return (
    <Modal animationType="fade" visible={show} transparent>
      <View style={styles.modal}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      </View>
    </Modal>
  );
};
