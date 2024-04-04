import {
  View,
  Text,
  FlatList,
  useColorScheme,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Stack, Link, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import React, { useState, useEffect } from "react";

import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const PlaceholderImage = require("@/assets/images/profile/Mick-Jagger.jpeg");

interface RenderItemProps {
  name: string;
}

const RenderItem = ({ name }: RenderItemProps) => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <Link href={`/chats/${name}`} asChild>
      <Pressable
        style={{
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Image
          source={PlaceholderImage}
          style={{ width: 60, height: 60, borderRadius: 50 }}
        />
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            paddingTop: 10,
            borderBottomColor: "rgb(0,0,0,0.1)",
          }}
        >
          <Text
            style={{
              color: themeColors.text,
              fontSize: 18,
            }}
          >
            {name}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

const Finder = () => {
  const { users } = useLocalSearchParams();
  const convex = useConvex();
  const [data, setData] = useState<
    {
      _id: Id<"user">;
      _creationTime: number;
      file?: string | undefined;
      user_id: string;
      username: string;
      date_of_birth: string;
      phone_number: string;
      description: string;
    }[]
  >([]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const loadAllUsers = async () => {
      const allUsers = await convex.query(api.user.getUsers);
      if (allUsers) {
        setData(allUsers);
        setFilteredData(allUsers.filter((user) => user.username !== users));
      }
    };
    loadAllUsers();
  }, [users]);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.username.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log(newData);
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search",
            textColor: "white",
            hideWhenScrolling: false,
            hideNavigationBar: false,
            onChangeText: (event) => {
              searchFilterFunction(event.nativeEvent.text);
            },
          },
        }}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.username}
        contentInsetAdjustmentBehavior="automatic"
        ItemSeparatorComponent={() => {
          return <View style={{ height: 15 }} />;
        }}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => <RenderItem name={item.username} />}
      />
    </SafeAreaView>
  );
};

export default Finder;
