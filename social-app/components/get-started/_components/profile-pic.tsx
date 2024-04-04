import { View, Pressable, StyleSheet, useColorScheme } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import ImageViewer from "./picker/imageViewer";

const PlaceholderImage = require("@/assets/images/profile/gradient.png");

interface ProfilePicProps {
  saveImage: (image: string | null) => void;
}

const ProfilePic = ({ saveImage }: ProfilePicProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [icon, setIcon] = useState<"plus" | "close">("plus");

  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      saveImage(result.assets[0].uri);
      setIcon("close");
    } else {
      alert("You did not select any image");
    }
  };

  const handleImage = () => {
    if (selectedImage) {
      setSelectedImage(null);
      setIcon("plus");
    } else {
      pickImageAsync();
    }
  };

  return (
    <View style={{ alignSelf: "center" }}>
      <ImageViewer
        placeholderImage={PlaceholderImage}
        selectedImage={selectedImage}
      />
      <Pressable
        onPress={handleImage}
        style={[styles.cross, { backgroundColor: themeColors.primary }]}
      >
        <AntDesign name={icon} size={24} color={"white"} />
      </Pressable>
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  cross: {
    padding: 5,
    borderRadius: 25,
    position: "absolute",
    bottom: 0,
    right: -5,
    borderColor: "white",
    borderWidth: 2,
  },
});
