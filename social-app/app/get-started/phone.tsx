import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Stack, Link } from "expo-router";
import Colors from "@/constants/Colors";
import React, { useState } from "react";

import index from "@/assets/data/index.json";

interface RenderItemProps {
  country: string;
  index: string;
}

const RenderItem = ({ country, index }: RenderItemProps) => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const borderColor =
    colorScheme === "dark" ? "rgba(255, 255, 255, .1)" : "rgba(0, 0, 0, .1)";
  return (
    <Link
      href={{
        pathname: "/get-started/",
        params: { index: index },
      }}
      asChild
    >
      <Pressable>
        <View style={[styles.container, { borderColor: borderColor }]}>
          <Text style={{ color: themeColors.text, fontSize: 16 }}>
            {country}
          </Text>
          <Text style={{ color: "grey" }}>{index}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const PhoneIndex = () => {
  const [filteredData, setFilteredData] = useState(index);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = index.filter((item) => {
        const itemData = item.country.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(index);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search for a phone index",
            onChangeText: (event) => {
              searchFilterFunction(event.nativeEvent.text);
            },
          },
        }}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.index}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <RenderItem country={item.country} index={item.index} />
        )}
      />
    </View>
  );
};

export default PhoneIndex;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
