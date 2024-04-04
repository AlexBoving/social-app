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
      <Text style={{ paddingLeft: 5, fontSize: 20, color: themeColors.text }}>
        Willing to share us more info?
      </Text>
      <View
        style={[
          styles.description,
          {
            borderColor: themeColors.text,
            backgroundColor: themeColors.surface,
          },
        ]}
      >
        <TextInput
          placeholder="Insert your description..."
          value={description}
          onChangeText={(description) => {
            setDescription(description);
          }}
          multiline={true}
          maxLength={150}
          style={{ flex: 1, color: themeColors.text, fontSize: 16 }}
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
    height: 90,
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
  },
  text: {
    alignSelf: "flex-end",
    fontFamily: "niv-l",
  },
});
