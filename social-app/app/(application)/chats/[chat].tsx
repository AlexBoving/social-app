import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState, useRef } from "react";

import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface RenderMessageProps {}

const RenderMessage = ({ item }: RenderMessageProps) => {
  const isUserMessage = item.user === user;
};

const Chat = () => {
  // Back-end + Navigation
  const convex = useConvex();
  const navigation = useNavigation();
  const { chat } = useLocalSearchParams();
  const [user, setUser] = useState<any>();
  const addMessage = useMutation(api.messages.sendMessage);
  const messages = useQuery(api.messages.getMessages, {
    chat_id: chat as Id<"chats">,
  });

  // Front-end: Colors.
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styleBackground = colorScheme === "light" ? Colors.light.surface : "";

  // Front-end.
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    const loadUser = async () => {
      // Load our user.
      const user = await convex.query(api.user.getMyUser);
      setUser(user);

      // Load the chat group.
      const chatGroup = await convex.query(api.chats.getChatById, {
        chatId: chat as Id<"chats">,
      });

      // Retrieves the other's id in the chat group.
      const otherUserId =
        chatGroup?.user_1 === user?._id ? chatGroup?.user_2 : chatGroup?.user_1;

      // Load the other user from its id.
      const otherUser = await convex.query(api.user.getUserById, {
        userId: otherUserId as Id<"user">,
      });

      // Set the title of the chat to the other user's username.
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

  // Send message to Convex.
  const handleMessage = async (content: string) => {
    Keyboard.dismiss();

    if (selectedImage) {
      const url = new URL(`${process.env.EXPO_PUBLIC_CONVEX_SITE}/sendImage`);

      url.searchParams.set("user", user?.username);
      url.searchParams.set("chat_id", chat as Id<"chats">);
      url.searchParams.set("content", newMessage);

      // Convert URI to blob.
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      // Send blob to Convex
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": blob!.type },
        body: blob,
      })
        .then(() => {
          setSelectedImage(null);
          setNewMessage("");
        })
        .catch((err) => console.log("ERROR: ", err))
        .finally(() => setUploading(false));
    } else {
      // Regular mutation to add a message
      await addMessage({
        chat_id: chat as Id<"chats">,
        content: newMessage,
        user: user?.username,
      });
      setNewMessage("");
    }
  };

  // Open image picker and set selected image
  const captureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styleBackground }}>
      <Text>Chat</Text>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
