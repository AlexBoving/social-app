import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import React, { useEffect } from "react";

const Chat = () => {
  const slug = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styleBackground = colorScheme === "light" ? Colors.light.surface : "";

  useEffect(() => {
    router.dismissAll;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styleBackground }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Text style={{ color: "white", fontSize: 20 }}>{slug.chat}</Text>
          ),
        }}
      />
      <Text>Chat</Text>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
