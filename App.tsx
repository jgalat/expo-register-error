import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  isTMAvailable,
  isTaskDefined,
  isTaskRegistered,
  registerTask,
  unregisterTask,
} from "./tasks";

export default function App() {
  const [s, ss] = React.useState<Record<string, any>>({});

  const sync = async () => {
    ss({
      available: await isTMAvailable(),
      defined: isTaskDefined(),
      registered: await isTaskRegistered(),
    });
  };

  return (
    <SafeAreaView style={{ paddingTop: 16 }}>
      <StatusBar style="auto" />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          title="register"
          onPress={async () => {
            try {
              await registerTask();
              await sync();
            } catch (e: unknown) {
              ss({ error: e });
            }
          }}
        />
        <Button
          title="unregister"
          onPress={async () => {
            try {
              await unregisterTask();
              await sync();
            } catch (e: unknown) {
              ss({ error: e });
            }
          }}
        />
      </View>
      <Text style={{ marginTop: 16, paddingHorizontal: 16 }}>
        {JSON.stringify(s, null, 2)}
      </Text>
    </SafeAreaView>
  );
}
