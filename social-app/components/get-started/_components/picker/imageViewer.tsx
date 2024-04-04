import { Image, StyleSheet } from "react-native";
import React from "react";

interface ImageViewerProps {
  placeholderImage: any;
  selectedImage: string | null;
}

const ImageViewer = ({ placeholderImage, selectedImage }: ImageViewerProps) => {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImage;

  return <Image source={imageSource} style={styles.image} />;
};

export default ImageViewer;

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    resizeMode: "cover",
    width: 120,
    height: 120,
  },
});
