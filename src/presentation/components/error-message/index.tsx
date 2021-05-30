import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

type Props = {
  show: boolean;
  text: string | any;
};

export const ErrorMessage: React.FC<Props> = ({ show, text }) => {
  return (
    <View style={styles.errorContainer}>
      {!!show && (
        <>
          <Icon
            name="exclamation-circle"
            size={15}
            color="red"
            style={styles.errorIcon}
          />
          <Text style={styles.errorText}>{text}</Text>
        </>
      )}
    </View>
  );
};
