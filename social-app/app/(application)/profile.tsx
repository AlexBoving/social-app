import { View, SafeAreaView, StyleSheet } from "react-native";
import React from "react";

import Header from "@/components/profile/header";
import About from "@/components/profile/about";
import Followers from "@/components/profile/followers";

import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Profile = () => {
  const convex = useConvex();
  const user = useQuery(api.user.getMyUser);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ gap: 20, padding: 10 }}>
        <Header username={user?.username as string} myUser={true} />
        <About description={user?.description as string} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
