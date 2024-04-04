import {
  View,
  Text,
  TextInput,
  useColorScheme,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Keyboard,
} from "react-native";

import Colors from "@/constants/Colors";

import Header from "./_components/header";
import Footer from "./_components/footer";

import React, { useEffect, useRef, useState } from "react";

interface NameProps {
  scroll: (y: number) => void;
  setUsername: (name: string) => void;
}

const Name = ({ scroll, setUsername }: NameProps) => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const windowWidth = Dimensions.get("window").width;

  const [firstlastname, setFirstLastName] = useState("");
  const [hidden, setHidden] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    if (firstlastname.length > 0) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [firstlastname]);

  const scrollTo = () => {
    setUsername(firstlastname);
    scroll(windowWidth);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { width: windowWidth }]}
      keyboardVerticalOffset={80}
    >
      <Header
        title="What is your name?"
        subtitle="Your information can be modified later on in your profile settings."
      />

      <View style={{ gap: 5 }}>
        <View style={{ paddingLeft: 5 }}>
          <Text style={{ fontSize: 20, color: themeColors.text }}>
            First & Last Name
          </Text>
        </View>

        <TextInput
          ref={inputRef}
          placeholder="John"
          autoCapitalize="words"
          maxLength={25}
          onChangeText={(firstlastname) => setFirstLastName(firstlastname)}
          value={firstlastname}
          style={[
            styles.input,
            { backgroundColor: themeColors.surface, color: themeColors.text },
          ]}
          autoFocus={true}
          enterKeyHint="next"
          blurOnSubmit={false}
        />
      </View>

      <View style={{ flex: 1 }} />

      <Footer hidden={hidden} onPress={scrollTo} />
    </KeyboardAvoidingView>
  );
};

export default Name;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    paddingHorizontal: 10,
  },
  input: {
    padding: 10,
    borderRadius: 12,
    fontFamily: "niv-r-smallcaps",
    fontSize: 20,
  },
});
