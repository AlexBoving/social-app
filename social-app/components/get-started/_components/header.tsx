import { View, Text, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import React from "react";

interface HeaderAuthProps {
  title: string;
  subtitle: string;
}

const HeaderAuth = ({ title, subtitle }: HeaderAuthProps) => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <View>
      <Text
        style={{
          fontFamily: "niv-b",
          fontSize: 30,
          color: themeColors.text,
        }}
      >
        {title}
      </Text>
      <Text style={{ fontSize: 16, color: themeColors.text }}>{subtitle}</Text>
    </View>
  );
};

export default HeaderAuth;
