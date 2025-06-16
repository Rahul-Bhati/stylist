import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import * as SplashScreen from 'expo-splash-screen';
import "../global.css";
import { useFonts } from "@expo-google-fonts/work-sans"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    "WorkSans-Semibold": require("../assets/fonts/WorkSans-Semibold.ttf"),
    "WorkSans-Regular": require("../assets/fonts/WorkSans-Regular.ttf"),
    "WorkSans-Bold": require("../assets/fonts/WorkSans-Bold.ttf"),
    "WorkSans-Medium": require("../assets/fonts/WorkSans-Medium.ttf"),
    "Thunder-Thin": require("../assets/fonts/Thunder-ThinHC.ttf"),
    "Thunder-Bold": require("../assets/fonts/Thunder-BoldHC.ttf"),
    "Thunder-SemiBold": require("../assets/fonts/Thunder-SemiBoldHC.ttf"),
    "Thunder-Medium": require("../assets/fonts/Thunder-MediumHC.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="stylist/[id]" />
        <Stack.Screen name="calendar/[id]" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}