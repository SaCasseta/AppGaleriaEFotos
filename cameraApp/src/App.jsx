import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";

export default function CameraPostScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [text, setText] = useState("");
  const cameraRef = useRef(null);

  // Pedir permissão para usar a câmera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Tirar foto
  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
    }
  };

  // Enviar foto + texto para o backend
  const sendPost = async () => {
    if (!imageUri || text.trim() === "") {
      alert("É necessário uma foto e um texto!");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    formData.append("photo", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch("http://SEU_BACKEND_IP:PORT/posts", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.ok) {
        alert("Post enviado com sucesso!");
        setImageUri(null);
        setText("");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar o post.");
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>Sem acesso à câmera</Text>;

  return (
    <View style={styles.container}>
      {!imageUri ? (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={cameraRef}
          onCameraReady={() => setCameraReady(true)}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.button}>
              <Text style={styles.text}>Tirar Foto</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: imageUri }} style={styles.preview} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Escreva algo..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Postar" onPress={sendPost} />
      {imageUri && (
        <Button title="Tirar outra foto" onPress={() => setImageUri(null)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  camera: { flex: 1, justifyContent: "flex-end" },
  buttonContainer: {
    backgroundColor: "transparent",
    alignSelf: "center",
    marginBottom: 20,
  },
  button: { backgroundColor: "#6a5acd", padding: 15, borderRadius: 10 },
  text: { color: "white", fontSize: 18 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  preview: { width: "100%", height: 300, marginBottom: 10, borderRadius: 10 },
});
