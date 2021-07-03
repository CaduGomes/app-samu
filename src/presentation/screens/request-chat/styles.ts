import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  messagesContainer: {
    flex: 1,
    margin: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  formContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    bottom: 0,
    width: "70%",
    height: 60,
  },
  input: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    paddingLeft: 10,
    width: "30%",
    height: 60,
  },
});
