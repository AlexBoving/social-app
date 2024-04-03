import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useColorScheme } from "react-native";
import { SplashScreen, Stack } from "expo-router";

import { ConvexClientProvider } from "@/providers/convex-client-provider";

import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    NiveauGrotesk: require("../assets/fonts/NiveauGroteskRegular.otf"),
    "niv-b": require("../assets/fonts/NiveauGroteskBold.otf"),
    "niv-l": require("../assets/fonts/NiveauGroteskLight.otf"),
    "niv-li": require("../assets/fonts/NiveauGroteskLight-Italic.otf"),
    "niv-r-smallcaps": require("../assets/fonts/NiveauGroteskRegular-SmallCaps.otf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ConvexClientProvider>
      <RootLayoutNav />
      <StatusBar style="auto" />
    </ConvexClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(application)" options={{ headerShown: false }} />
        <Stack.Screen name="get-started" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
