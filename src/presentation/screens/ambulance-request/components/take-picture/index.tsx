import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
  MediaTypeOptions,
} from "expo-image-picker";

import { AmbulanceRequest } from "@domain/usecases";

import styles from "./styles";

type Props = {
  useAmbulanceRequest: AmbulanceRequest;
  docId: string;
};

type ImageType = {
  uri: string;
  url: string;
  name: string;
};

function TakePicture({ useAmbulanceRequest, docId }: Props) {
  const [imageList, setImageList] = useState<ImageType[] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState<ImageType | null>(null);

  useEffect(() => {
    async function requestCameraPermission() {
      const { status } = await requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    requestCameraPermission();
  }, []);

  async function pickImage() {
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.3,
    });

    if (!result.cancelled) {
      try {
        const imageURISplited = result.uri.split("/");

        const imageName = imageURISplited[imageURISplited.length - 1];
        Alert.alert("Imagem Enviada", "A imagem foi enviada com sucesso!");
        const imgURL = await useAmbulanceRequest.addImage({
          docId,
          imageURI: result.uri,
          imageName,
        });

        const newImageAfterUpload: ImageType = {
          url: imgURL,
          uri: result.uri,
          name: imageName,
        };

        if (imageList) {
          setImageList([...imageList, newImageAfterUpload]);
        } else {
          setImageList([newImageAfterUpload]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  function openImageModal(uri: ImageType) {
    setModalImage(uri);
    setModalVisible(true);
  }

  function closeImageModal() {
    setModalVisible(false);
    setModalImage(null);
  }

  function removeImageFromList() {
    Alert.alert("Remover Imagem", "Você deseja remover essa imagem da lista?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        onPress: async () => {
          try {
            if (modalImage) {
              await useAmbulanceRequest.deleteImage({
                docId,
                imageName: modalImage.name,
                imageURL: modalImage.url,
              });

              if (imageList) {
                const newImageList = imageList.filter(
                  (image) => image.name !== modalImage.name
                );
                setImageList(newImageList);
              }
              setModalVisible(false);
            }
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalCloseButton}>
            <Pressable onPress={closeImageModal}>
              <Icon name="times" color="white" size={25} />
            </Pressable>
          </View>
          <Image source={{ uri: modalImage?.uri }} style={styles.modalImage} />
          <View style={styles.modalRemoveButton}>
            <Pressable onPress={removeImageFromList}>
              <Icon name="trash" color="white" size={25} />
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Fotos Enviadas</Text>
        <Pressable onPress={pickImage}>
          <Icon name="plus" size={20} />
        </Pressable>
      </View>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal>
          {imageList
            ? imageList.map((image, index) => (
                <Pressable
                  key={`image-${index}`}
                  onPress={() => openImageModal(image)}
                >
                  <Image source={{ uri: image.uri }} style={styles.image} />
                </Pressable>
              ))
            : null}
        </ScrollView>
      </View>
    </View>
  );
}

export default React.memo(TakePicture);
