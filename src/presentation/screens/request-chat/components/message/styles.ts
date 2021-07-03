import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 70,
    justifyContent: "center",
  },
  received: {
    alignItems: "flex-start",
  },
  sent: {
    alignItems: "flex-end",
  },
  textContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    padding: 10,
    paddingRight: 40,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
  textTime: {
    // position: "absolute"
    color: "#fff",
    fontSize: 8,
  },
});
