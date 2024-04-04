import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
  },
});
