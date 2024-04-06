import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Colors from "@/constants/Colors";
import { Dimensions } from "react-native";

import Header from "./_components/header";
import ModalOpener from "./_components/modal-opener";
import DateOfBirth from "./modals/date-of-birth";
import Footer from "./_components/footer";

import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";

interface BirthAndGenderProps {
  scroll: (x: number) => void;
  setBirth: (date: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
}

const BirthAndGender = ({
  scroll,
  setBirth,
  setPhoneNumber,
}: BirthAndGenderProps) => {
  const { index } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const windowWidth = Dimensions.get("window").width;

  const [modalVisible, setModalVisible] = useState(false);

  const [birthdate, setBirthdate] = useState("Date of Birth");
  const [sex, setSex] = useState("Gender");
  const [phoneIndex, setPhoneIndex] = useState("+39");
  const [phonie, setPhonie] = useState("");

  useEffect(() => {
    if (index) {
      setPhoneIndex(index as string);
    }
  }, [index]);

  const scrollTo = () => {
    setBirth(birthdate);
    scroll(windowWidth * 2);
  };

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
      <View style={{ gap: 20, flex: 1 }}>
        <ModalOpener
          title="Date of Birth"
          value={birthdate}
          setModalVisible={setModalVisible}
          icon="calendar"
        />
        <View style={{ gap: 5 }}>
          <Text style={[styles.title, { color: themeColors.text }]}>
            Phone Number
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Link href={"/get-started/phone"} asChild>
              <Pressable
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                  width: 50,
                  borderRadius: 12,
                  backgroundColor: themeColors.surface,
                }}
              >
                <Text style={{ color: themeColors.text, fontSize: 18 }}>
                  {phoneIndex}
                </Text>
              </Pressable>
            </Link>
            <TextInput
              placeholder=""
              value={phonie}
              keyboardType="numeric"
              onChangeText={(phoneNumber) => {
                setPhonie(phoneNumber);
                setPhoneNumber(phoneNumber);
              }}
              style={[
                styles.input,
                {
                  backgroundColor: themeColors.surface,
                  color: themeColors.text,
                },
              ]}
            />
          </View>
        </View>
      </View>
      <DateOfBirth
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Footer hidden={false} onPress={scrollTo} />
    </KeyboardAvoidingView>
  );
};

export default BirthAndGender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 10,
  },
  title: {
    paddingLeft: 5,
    fontSize: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
