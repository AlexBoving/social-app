import { Pressable, useColorScheme, Text } from "react-native";
import { Link, Stack } from "expo-router";
import Colors from "@/constants/Colors";

import React from "react";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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
          headerTintColor: themeColors.text,
          headerTransparent: true,
          headerBlurEffect: "light",
          headerRight: () => {
            return (
              <Link href={"/(application)/chats/finder"} asChild>
                <Pressable>
                  <Feather name="pen-tool" size={24} color={themeColors.text} />
                </Pressable>
              </Link>
            );
          },
          headerLeft: () => {
            return (
              <Pressable>
                <MaterialCommunityIcons
                  name="dots-horizontal-circle-outline"
                  size={24}
                  color={themeColors.text}
                />
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name="[chat]"
        options={{
          headerTitleStyle: {
            color: "white",
          },
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
          presentation: "modal",
          headerTitle: "New message",
          headerTransparent: true,
          headerTintColor: themeColors.text,
        }}
      />
    </Stack>
  );
};

export default Layout;
