import { Tabs } from 'expo-router';
import { Home, MessageCircle, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // position: "absolute",
          backgroundColor: '#1A1A1A',
          // borderTopWidth: 0,
          // height: 90,
          // paddingBottom: 24,
          // paddingTop: 16,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            // tint='dark'
            style={{
              // position: "absolute",
              // backgroundColor: 'transparent',
              overflow: 'hidden',
            }}
          />
        )
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sessions"
        options={{
          title: 'Sessions',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}