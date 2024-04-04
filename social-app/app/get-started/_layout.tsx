import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="phone"
        options={{
          headerTitle: "Phone index",
          headerTintColor: themeColors.text,
          presentation: "modal",
          animation: "slide_from_bottom",
          headerTransparent: true,
          headerBlurEffect: "light",
        }}
      />
    </Stack>
  );
};

export default Layout;
