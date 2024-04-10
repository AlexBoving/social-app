import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { Stack, Link } from "expo-router";
import ChatDisplay from "@/components/chats/chat-display";
import React, { useEffect, useState } from "react";
import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface RenderItemProps {
  item: {
    _id: Id<"chats">;
    username: string;
    last_comment: string;
    timestamp: string;
  };
}

const RenderItem = ({ item }: RenderItemProps) => {
  return (
    <Link
      href={{
        pathname: "/(application)/chats/[chat]",
        params: { chat: item._id },
      }}
      asChild
    >
      <Pressable>
        <ChatDisplay
          username={item.username}
          comment={item.last_comment}
          date={item.timestamp}
        />
      </Pressable>
    </Link>
  );
};

const Index = () => {
  const convex = useConvex();
  const myUser = useQuery(api.user.getMyUser);

  const [chats, setChats] = useState<
    {
      _id: Id<"chats">;
      username: string;
      last_comment: string;
      timestamp: string;
    }[]
  >([]);
  const [filteredChats, setFilteredChats] = useState(chats);

  useEffect(() => {
    const loadChats = async () => {
      // Retrieves all the chat groups which the current user is in.
      const chatGroups = await convex.query(api.chats.get, {
        user: myUser?._id as Id<"user">,
      });
      // Retrieves the other user id in all of the chat groups.
      const otherUsersId = chatGroups.map((chat) => {
        const otherUser =
          chat.user_1 === myUser?._id ? chat.user_2 : chat.user_1;
        return otherUser;
      });
      // Retrieves the username of the other users.
      const otherUsers = await convex.query(api.user.getUserByIds, {
        userIds: otherUsersId,
      });
      // Prepares the chat data to be displayed.
      const chats = otherUsers.map((otherName) => {
        const chatId = chatGroups.find(
          (chat) =>
            chat.user_1 === otherName?._id || chat.user_2 === otherName._id
        )?._id;
        const last_comment = chatGroups.find(
          (chat) =>
            chat.user_1 === otherName?._id || chat.user_2 === otherName._id
        )?.last_comment;
        return {
          _id: chatId as Id<"chats">,
          username: otherName.username,
          last_comment: last_comment as string,
          timestamp: "Fri",
        };
      });
      setChats(chats);
      setFilteredChats(chats);
    };
    loadChats();
  }, [myUser]);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newChats = chats.filter((chat) => {
        const itemData = chat.username.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredChats(newChats);
    } else {
      setFilteredChats(chats);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search for users",
            onChangeText: (event) => {
              searchFilterFunction(event.nativeEvent.text);
            },
          },
        }}
      />
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <RenderItem item={item} />}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 10 }} />;
        }}
        contentInsetAdjustmentBehavior={"automatic"}
        style={styles.container}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 20,
  },
});
