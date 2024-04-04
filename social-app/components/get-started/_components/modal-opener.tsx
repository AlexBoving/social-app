import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Pressable,
} from "react-native";
import Colors from "@/constants/Colors";
import React from "react";

import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";

interface ModalOpenerProps {
  title: string;
  icon: string;
  value: string;
  setModalVisible: (arg: boolean) => void;
}

const ModalOpener = ({
  title,
  icon,
  value,
  setModalVisible,
}: ModalOpenerProps) => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <View style={{ gap: 5 }}>
      <Text style={{ paddingLeft: 5, fontSize: 20, color: themeColors.text }}>
        {title}
      </Text>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={[styles.container, { backgroundColor: themeColors.surface }]}
      >
        {icon === "calendar" ? (
          <AntDesign name="calendar" size={24} color={themeColors.text} />
        ) : (
          <FontAwesome5 name="venus-mars" size={24} color={themeColors.text} />
        )}
        <View
          style={{
            width: 1,
            height: "50%",
            backgroundColor: themeColors.text,
          }}
        />
        <Text
          style={{
            fontSize: 18,
            flex: 1,
            color: themeColors.text,
          }}
        >
          {value}
        </Text>
        <Ionicons name="chevron-down" size={24} color={themeColors.text} />
      </Pressable>
    </View>
  );
};

export default ModalOpener;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 10,
    gap: 10,
  },
});
