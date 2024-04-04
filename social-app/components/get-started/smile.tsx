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
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "convex/_generated/dataModel";

interface SmileProps {
  setSelectedImage: (image: string | null) => void;
  handleSubmit: () => void;
}

const Smile = ({ setSelectedImage, handleSubmit }: SmileProps) => {
  const windowWidth = Dimensions.get("window").width;

  const [description, setDescription] = useState("");
  //const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // const user = useQuery(api.user.getUser, {});

  /* const handleSubmit = async () => {
    if (selectedImage) {
      const sendImageUrl = new URL(
        `${process.env.EXPO_PUBLIC_CONVEX_SITE}/sendImage`
      );

      sendImageUrl.searchParams.set("id", user?._id as Id<"user">);
      console.log("Send Image URL: ", sendImageUrl);

      // Convert URI to blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      // Send blob to convex
      await fetch(sendImageUrl, {
        method: "POST",
        headers: { "Content-Type": blob!.type },
        body: blob,
      });
    }
  };*/

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { width: windowWidth }]}
      keyboardVerticalOffset={80}
    >
      <Header
        title="Share us some information!"
        subtitle="Your information can be modified later on in your profile settings."
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
