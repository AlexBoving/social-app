import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Colors from "@/constants/Colors";
import React, { useEffect, useState } from "react";

interface DescriptionProps {
  description: string;
  setDescription: (description: string) => void;
}

const Description = ({ description, setDescription }: DescriptionProps) => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [wordCounter, setWordCounter] = useState(0);

  useEffect(() => {
    setWordCounter(description.length);
  }, [description]);

  return (
    <View style={{ gap: 5 }}>
      <Text style={{ fontSize: 20, color: themeColors.text }}>
        Tell us more about yourself
      </Text>
      <View style={[styles.description, { borderColor: themeColors.text }]}>
        <TextInput
          placeholder="Insert your description..."
          value={description}
          onChangeText={(description) => {
            setDescription(description);
          }}
          multiline={true}
          maxLength={150}
          style={{ flex: 1 }}
        />
        <Text style={[styles.text, { color: themeColors.text }]}>
          {wordCounter} / 150
        </Text>
      </View>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  description: {
    height: 80,
    padding: 5,
    borderWidth: 1,
    borderRadius: 12,
  },
  text: {
    alignSelf: "flex-end",
    fontFamily: "niv-l",
  },
});
