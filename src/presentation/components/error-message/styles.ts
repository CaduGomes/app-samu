import { StyleSheet } from "react-native";

export default StyleSheet.create({
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 17,
    marginTop: 5,
    marginBottom: 12,
    justifyContent: "flex-start",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  errorIcon: {
    paddingRight: 10,
    paddingTop: 3,
  },
});
