import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  View,
} from "react-native";

import Header from "./_components/header";
import ProfilePic from "./_components/profile-pic";
import Description from "./_components/description";
import Footer from "./_components/footer";

import React, { useState } from "react";

interface SmileProps {
  setSelectedImage: (image: string | null) => void;
  handleSubmit: () => void;
}

const Smile = ({ setSelectedImage, handleSubmit }: SmileProps) => {
  const windowWidth = Dimensions.get("window").width;

  const [description, setDescription] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { width: windowWidth }]}
      keyboardVerticalOffset={80}
    >
      <Header
        title="Don't forget to smile!"
        subtitle="Select a profile picture."
      />
      <ProfilePic saveImage={setSelectedImage} />
      <Description description={description} setDescription={setDescription} />
      <View style={{ flex: 1 }} />
      <Footer hidden={false} onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
};

export default Smile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 10,
  },
  description: {
    height: 80,
    padding: 5,
    borderWidth: 1,
    borderRadius: 12,
  },
});
