import React from "react";
import { View, Text } from "react-native";
import { MessageModel } from "@domain/models";

import styles from "./styles";
import { Pressable } from "react-native";

type Props = MessageModel & {
  index: number;
  fastAnswer: (answer: string) => void;
};

export const Message: React.FC<Props> = ({
  text,
  createdAt,
  direction,
  index,
  id,
  answers,
  answered,
  fastAnswer,
}) => {
  const customStyles = direction === "client" ? styles.sent : styles.received;

  function FastAnswers() {
    console.log(answered);
    if (answers && !answered) {
      return (
        <View style={styles.answersContainer}>
          {answers.map((answer, index) => (
            <Pressable
              key={`answer-${index}`}
              onPress={() => fastAnswer(answer)}
            >
              <View style={styles.answer}>
                <Text style={styles.answerText}>{answer}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      );
    }
    return null;
  }

  return (
    <>
      <FastAnswers />
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
    </>
  );
};
