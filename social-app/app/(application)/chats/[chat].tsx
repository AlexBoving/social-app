import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import React, { useEffect } from "react";

import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const Chat = () => {
  // Back-end + Navigation
  const convex = useConvex();
  const navigation = useNavigation();
  const { chat } = useLocalSearchParams();
  const myUser = useQuery(api.user.getMyUser);

  // Front-end: Colors.
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styleBackground = colorScheme === "light" ? Colors.light.surface : "";

  useEffect(() => {
    const loadUser = async () => {
      const chatGroup = await convex.query(api.chats.getChatById, {
        chatId: chat as Id<"chats">,
      });
      const otherUserId =
        chatGroup?.user_1 === myUser?._id
          ? chatGroup?.user_2
          : chatGroup?.user_1;
      const otherUser = await convex.query(api.user.getUserById, {
        userId: otherUserId as Id<"user">,
      });
      navigation.setOptions({
        title: otherUser!.username,
      });
    };
    if (chat) loadUser();
  }, [chat]);

  // Scrolls to bottom when a new message is added.
  useEffect(() => {
    setTimeout(() => {
      listRef.current!.scrollToEnd({ animated: true });
    }, 300);
  }, [messages]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styleBackground }}>
      <Text>Chat</Text>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
