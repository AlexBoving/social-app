import {
  View,
  Text,
  Pressable,
  useColorScheme,
  StyleSheet,
  Dimensions,
} from "react-native";

import Colors from "@/constants/Colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import React from "react";

interface FooterProps {
  hidden: boolean;
  onPress: () => void;
}

const Footer = ({ hidden, onPress }: FooterProps) => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const windowWidth = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <MaterialIcons
          name="remove-red-eye"
          size={24}
          color={themeColors.text}
        />
        <Text
          numberOfLines={2}
          style={[styles.text, { color: themeColors.text }]}
        >
          Those informations will be displayed on your profile
        </Text>
      </View>
      <Pressable
        onPress={onPress}
        disabled={hidden ? true : false}
        style={hidden ? { opacity: 0.25 } : null}
      >
        <AntDesign name="rightcircle" size={40} color={themeColors.primary} />
      </Pressable>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    width: 250,
    fontFamily: "niv-l",
    fontSize: 14,
  },
});
