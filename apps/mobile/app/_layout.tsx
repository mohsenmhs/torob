import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApiQueryProvider } from "@repo/api";

export default function RootLayout() {
  return (
    <ApiQueryProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaProvider>
    </ApiQueryProvider>
  );
}

