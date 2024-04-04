import { ScrollView, SafeAreaView } from "react-native";

import Name from "@/components/get-started/name";
import BirthAndGender from "@/components/get-started/birth-gender";
import Smile from "@/components/get-started/smile";

import ProgressBar from "@/components/get-started/_components/progress-bar";

import React, { useRef, useState } from "react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useRouter } from "expo-router";

const ProfileSettings = () => {
  const insertUser = useMutation(api.user.createUser);

  const [username, setUsername] = useState("");
  const [birth, setBirth] = useState("17-06-1999");
  const [gender, setGender] = useState("male");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("Short description about me");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const router = useRouter();

  const _ScrollView = useRef<ScrollView>(null);

  const scrollTo = (x: number) => {
    _ScrollView.current?.scrollTo({ x, y: 0, animated: true });
    setStep(x / 275);
  };

  const handleSubmit = async () => {
    //console.log("Selected Image: ", selectedImage);
    /*if (selectedImage) {
      const sendImageUrl = new URL(
        `${process.env.EXPO_PUBLIC_CONVEX_SITE}/sendImage`
      );

      sendImageUrl.searchParams.set("username", username);
      sendImageUrl.searchParams.set("date_of_birth", birth);
      sendImageUrl.searchParams.set("gender", gender);
      sendImageUrl.searchParams.set("phone_number", phoneNumber);
      sendImageUrl.searchParams.set("type", "user");
      sendImageUrl.searchParams.set("description", description);
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
    } else {*/
    await insertUser({
      username: username,
      date_of_birth: birth,
      phone_number: "+1234567890",
      description: description,
    });
    router.replace("/(application)");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProgressBar step={step} steps={3} />
      <ScrollView
        ref={_ScrollView}
        horizontal
        scrollEnabled={false}
        keyboardShouldPersistTaps={"always"}
        showsHorizontalScrollIndicator={false}
      >
        <Name scroll={scrollTo} setUsername={setUsername} />
        <BirthAndGender
          scroll={scrollTo}
          setBirth={setBirth}
          setGender={setGender}
          setPhoneNumber={setPhoneNumber}
        />
        <Smile
          setSelectedImage={setSelectedImage}
          handleSubmit={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSettings;
