import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 250,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    marginBottom: 15,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 22,
    color: "black",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 5,
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  modalImage: {
    width: "70%",
    height: "70%",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  modalRemoveButton: {
    position: "absolute",
    top: 30,
    right: 30,
  },
  modalCloseButton: {
    position: "absolute",
    top: 30,
    left: 30,
  },
});
