import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
  MediaTypeOptions,
} from "expo-image-picker";

import { AmbulanceRequestRepository } from "@domain/repositories";

import styles from "./styles";

type Props = {
  useAmbulanceRequest: AmbulanceRequestRepository;
  docId: string;
};

type VideoType = {
  uri: string;
  url: string;
  name: string;
};

export const RecordVideo: React.FC<Props> = React.memo(
  ({ useAmbulanceRequest, docId }) => {
    const [videosList, setvideosList] = useState<VideoType[] | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVideo, setModalVideo] = useState<VideoType | null>(null);

    useEffect(() => {
      async function requestCameraPermission() {
        const { status } = await requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
      requestCameraPermission();
    }, []);

    async function recordVideo() {
      let result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Videos,
        videoMaxDuration: 10,
        aspect: [4, 3],
        quality: 0.1,
      });

      if (!result.cancelled) {
        try {
          const videoURISplited = result.uri.split("/");

          const videoName = videoURISplited[videoURISplited.length - 1];

          Alert.alert("Video Enviado", "O video foi enviado com sucesso!");

          const videoURL = await useAmbulanceRequest.addVideo({
            docId,
            videoURI: result.uri,
            videoName,
          });

          const newVideoAfterUpload: VideoType = {
            url: videoURL,
            uri: result.uri,
            name: videoName,
          };

          if (videosList) {
            setvideosList([...videosList, newVideoAfterUpload]);
          } else {
            setvideosList([newVideoAfterUpload]);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    function openVideoModal(uri: VideoType) {
      setModalVideo(uri);
      setModalVisible(true);
    }

    function closeImageModal() {
      setModalVisible(false);
      setModalVideo(null);
    }

    function removeVideoFromList() {
      Alert.alert("Remover Video", "Você deseja remover esse video da lista?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: async () => {
            try {
              if (modalVideo) {
                await useAmbulanceRequest.deleteVideo({
                  docId,
                  videoName: modalVideo.name,
                  videoURL: modalVideo.url,
                });

                if (videosList) {
                  const newvideosList = videosList.filter(
                    (image) => image.name !== modalVideo.name
                  );
                  setvideosList(newvideosList);
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
              <Pressable onPressIn={closeImageModal}>
                <Icon name="times" color="white" size={25} />
              </Pressable>
            </View>
            <Image
              source={{ uri: modalVideo?.uri }}
              style={styles.modalVideo}
            />
            <View style={styles.modalRemoveButton}>
              <Pressable onPressIn={removeVideoFromList}>
                <Icon name="trash" color="white" size={25} />
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.headerContainer}>
          <Text style={styles.sectionTitle}>Videos Enviados</Text>
          <Pressable onPressIn={recordVideo} hitSlop={30}>
            <Icon name="plus" size={25} />
          </Pressable>
        </View>
        <View style={styles.videosContainer}>
          <ScrollView horizontal>
            {videosList
              ? videosList.map((image, index) => (
                  <Pressable
                    key={`image-${index}`}
                    onPress={() => openVideoModal(image)}
                  >
                    <Image source={{ uri: image.uri }} style={styles.video} />
                  </Pressable>
                ))
              : null}
          </ScrollView>
        </View>
      </View>
    );
  }
);
