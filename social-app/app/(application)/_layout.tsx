import { useColorScheme } from "react-native";
import { Tabs, useSegments } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import React from "react";

const Layout = () => {
  const segments = useSegments();

  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: themeColors.tabBarActiveTintColor,
        tabBarInactiveTintColor: themeColors.tabBarInactiveTintColor,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="network"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="earth" color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-outline" color={color} size={30} />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            display: segments[2] === "[chat]" ? "none" : "flex",
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" color={color} size={30} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
