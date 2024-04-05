import { View, Text, Image, StyleSheet, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import React from "react";

const PlaceholderImage = require("@/assets/images/profile/Mick-Jagger.jpeg");

interface OtherUserProps {
  username: string;
  comment: string;
  date?: string;
}

const OtherUser = ({ username, comment, date }: OtherUserProps) => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const borderBottomColor = "rgba(0, 0, 0, 0.1)";

  return (
    <View style={styles.container}>
      <Image source={PlaceholderImage} style={styles.image} />
      <View
        style={[styles.description, { borderBottomColor: borderBottomColor }]}
      >
        <View style={styles.title}>
          <Text style={{ fontSize: 20, color: "black" }}>{username}</Text>
          <Text style={{ fontSize: 16, color: themeColors.text, opacity: 0.5 }}>
            {date}
          </Text>
        </View>
        <Text style={{ fontSize: 14, opacity: 0.5, color: themeColors.text }}>
          {comment}
        </Text>
      </View>
    </View>
  );
};

export default OtherUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  description: {
    flex: 1,
    paddingTop: 4,
    paddingRight: 5,
    gap: 2,
    borderBottomWidth: 1,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
