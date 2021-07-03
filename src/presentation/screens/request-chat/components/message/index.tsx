import React from "react";
import { View, Text } from "react-native";
import { MessageModel } from "@domain/models";

import styles from "./styles";

type Props = MessageModel & { index: number };

export const Message: React.FC<Props> = ({
  text,
  createdAt,
  direction,
  index,
  id,
}) => {
  const customStyles = direction === "client" ? styles.sent : styles.received;

  return (
    <View style={{ ...styles.container, ...customStyles }}>
      <View
        style={{
          ...styles.textContainer,
          backgroundColor: direction === "client" ? "#056162" : "#262D31",
        }}
      >
        <Text style={styles.text}>{text}</Text>
        {/* <Text style={styles.textTime}>
          {createdAt.toDate().getHours()}:{createdAt.toDate().getMinutes()}
        </Text> */}
      </View>
    </View>
  );
};
