import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  AuthLoading,
  Authenticated,
  Unauthenticated,
  ConvexReactClient,
} from "convex/react";
import * as SecureStore from "expo-secure-store"; // Securely store tokens in the keychain of the device.
import Authentication from "@/components/auth";
import { View } from "react-native";

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const tokenCache = {
  // Cache the Clerk JWT in memory so we don't have to fetch it from the keychain again.
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <Authentication />
        </Unauthenticated>
        <AuthLoading>
          <View />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
