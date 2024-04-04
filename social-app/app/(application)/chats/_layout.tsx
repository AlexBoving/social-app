import { Pressable, useColorScheme, Text } from "react-native";
import { Link, Stack } from "expo-router";
import Colors from "@/constants/Colors";

import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

const Layout = () => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styleHeader =
    colorScheme === "dark" ? Colors.dark.surface : Colors.light.primary;
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Chats",
          headerTitleStyle: {
            color: themeColors.text,
          },
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerTintColor: themeColors.text,
          headerStyle: { backgroundColor: themeColors.background },
          headerRight: () => {
            return (
              <Link href={"/(application)/chats/finder"} asChild>
                <Pressable>
                  <FontAwesome6
                    name="pen-to-square"
                    size={20}
                    color={themeColors.text}
                  />
                </Pressable>
              </Link>
            );
          },
          headerLeft: () => {
            return (
              <Pressable>
                <Text style={{ color: "white", fontSize: 20 }}>Edit</Text>
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name="[chat]"
        options={{
          headerStyle: {
            backgroundColor: styleHeader,
          },
          headerLeft: () => {
            return (
              <Link href="../" asChild>
                <Pressable
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Ionicons name="chevron-back" size={24} color={"white"} />
                  <Text style={{ fontSize: 20, color: "white" }}>Chats</Text>
                </Pressable>
              </Link>
            );
          },
        }}
      />
      <Stack.Screen
        name="finder"
        options={{
          headerTitle: "New message",
          headerTransparent: true,
          headerTintColor: themeColors.text,
          headerLeft: () => {
            return (
              <Link href="../" asChild>
                <Pressable>
                  <Text style={{ color: themeColors.text, fontSize: 18 }}>
                    Cancel
                  </Text>
                </Pressable>
              </Link>
            );
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
