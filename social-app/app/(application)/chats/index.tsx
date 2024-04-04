import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  FlatList,
  Pressable,
} from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import OtherUser from "@/components/other-user";
import React, { useEffect, useState } from "react";
import { useConvex, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
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
        pathname: `/chats/${item._id}`,
      }}
      asChild
    >
      <Pressable>
        <OtherUser
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
  const user = useQuery(api.user.getMyUser);
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

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
      const chatGroups = await convex.query(api.chats.get, {
        user: user?._id as Id<"user">,
      });
      const otherUsers = chatGroups.map((chat) => {
        const otherUser = chat.user_1 === user?._id ? chat.user_2 : chat.user_1;
        return otherUser;
      });

      const otherNames = await convex.query(api.user.getUserByIds, {
        userIds: otherUsers,
      });

      const chats = otherNames.map((otherName) => {
        const _id = chatGroups.find(
          (chat) =>
            chat.user_1 === otherName._id || chat.user_2 === otherName._id
        )?._id;
        const name = otherName.username;
        const last_comment = chatGroups.find(
          (chat) => chat.user_1 === user?._id || chat.user_2 === otherName._id
        )?.last_comment;
        return {
          _id: _id as Id<"chats">,
          username: name,
          last_comment: last_comment as string,
          timestamp: "Fri",
        };
      });

      setChats(chats);
      setFilteredChats(chats);
    };
    loadChats();
  }, [user]);

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
    <SafeAreaView style={{ flex: 1 }}>
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
      <View style={styles.container}>
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <RenderItem item={item} />}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 10 }} />;
          }}
          contentInsetAdjustmentBehavior={"automatic"}
        />
      </View>
    </SafeAreaView>
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
