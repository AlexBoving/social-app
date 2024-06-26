import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  Keyboard,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState, useRef } from "react";

import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { Feather } from "@expo/vector-icons";

const Chat = () => {
  // Back-end + Navigation
  const convex = useConvex();
  const navigation = useNavigation();
  const { chat } = useLocalSearchParams();
  const [user, setUser] = useState<string | null>();
  const addMessage = useMutation(api.messages.sendMessage);
  const messages = useQuery(api.messages.getMessages, {
    chat_id: chat as Id<"chats">,
  });

  // Front-end: Colors.
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styleBackground =
    colorScheme === "light" ? Colors.light.surface : Colors.dark.primary;

  // Front-end.
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    const loadUser = async () => {
      // Load our user.
      const user = await convex.query(api.user.getMyUser);
      setUser(user?.username);

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
  const handleMessage = async () => {
    Keyboard.dismiss();

    if (selectedImage) {
      const url = new URL(`${process.env.EXPO_PUBLIC_CONVEX_SITE}/sendImage`);

      url.searchParams.set("user", user!);
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
        user: user!,
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

  const renderMessage: ListRenderItem<Doc<"messages">> = ({ item }) => {
    const isUserMessage = item.user === user;

    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage
            ? styles.userMessageContainer
            : [
                styles.otherMessageContainer,
                {
                  backgroundColor:
                    colorScheme === "light" ? "#fff" : Colors.dark.surface,
                },
              ],
        ]}
      >
        {item.content !== "" && (
          <Text
            style={[
              styles.messageText,
              isUserMessage
                ? { color: "white" }
                : colorScheme === "light"
                  ? { color: "black" }
                  : { color: "white" },
            ]}
          >
            {item.content}
          </Text>
        )}
        {item.file && (
          <Image
            source={{ uri: item.file }}
            style={{ width: 200, height: 200, margin: 10 }}
          />
        )}
        <Text
          style={
            isUserMessage
              ? { color: "white" }
              : colorScheme === "light"
                ? { color: "black" }
                : { color: "white" }
          }
        >
          {new Date(item._creationTime).toLocaleTimeString()} - {item.user}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        { flex: 1 },
        colorScheme === "light" && { backgroundColor: Colors.light.surface },
      ]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id.toString()}
          ListFooterComponent={<View style={{ padding: 5 }} />}
          contentInsetAdjustmentBehavior="automatic"
        />
        {/* For the Inputbar. */}
        <View
          style={[
            styles.inputContainer,
            colorScheme === "light"
              ? { backgroundColor: Colors.light.primary }
              : { backgroundColor: Colors.dark.surface },
          ]}
        >
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <TextInput
              style={styles.textInput}
              value={newMessage}
              placeholder="Send a message..."
              placeholderTextColor={"grey"}
              multiline={true}
              selectionColor={"black"}
              autoCorrect={false}
              onChangeText={setNewMessage}
            />
            <Pressable onPress={captureImage}>
              <Feather name="file-plus" size={24} color={"white"} />
            </Pressable>
            <Pressable onPress={handleMessage} disabled={newMessage === ""}>
              <Feather name="send" size={24} color={"white"} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    maxWidth: "80%",
  },
  userMessageContainer: {
    backgroundColor: Colors.light.secondary,
    alignSelf: "flex-end",
  },
  otherMessageContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "wrap",
  },
  inputContainer: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 12,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: Colors.light.surface,
    paddingTop: 10,
  },
});
