import { Tabs, useSegments } from "expo-router";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import React from "react";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#ccc",
        headerShown: false,
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
