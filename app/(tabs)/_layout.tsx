import { Tabs } from 'expo-router';
import { Home, MessageCircle, User } from 'lucide-react-native';
import { Animated, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#1A1A1A',
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          paddingBottom: 24,
          paddingTop: 16,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#666666',
        // tabBarBackground: () => (
        //   <BlurView
        //     intensity={80}
        //     tint="dark"
        //     experimentalBlurMethod="dimezisBlurView"
        //     style={{
        //       position: 'absolute',
        //       left: 0,
        //       right: 0,
        //       bottom: 0,
        //       borderTopLeftRadius: 20,
        //       borderTopRightRadius: 20,
        //       backgroundColor: 'rgba(0, 0, 0, 0.3)',
        //       overflow: 'hidden',
        //     }}
        //   />
        // ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon Icon={Home} focused={focused} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sessions"
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon
              Icon={MessageCircle}
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon Icon={User} focused={focused} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};



function TabIcon({ Icon, focused, size, color }: any) {
  const animation = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: focused ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [focused]);

  const circleTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0], // pops up on focus
  });

  const circleOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: -10,
          width: size * 0.7,
          height: size * 0.2,
          backgroundColor: '#fff',
          borderTopLeftRadius: size,
          borderTopRightRadius: size,
          zIndex: -1,
          opacity: circleOpacity,
          transform: [{ translateY: circleTranslateY }],
        }}
      />
      <Icon size={size} color={color} />
    </View>
  );
}


// import { Tabs } from 'expo-router';
// import { Home, MessageCircle, User } from 'lucide-react-native';
// import { BlurView } from 'expo-blur';
// import { View } from 'react-native';

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           position: "absolute",
//           backgroundColor: '#1A1A1A',
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//           borderTopWidth: 0,
//           height: 70,
//           paddingBottom: 24,
//           paddingTop: 16,
//         },
//         tabBarActiveTintColor: '#FFFFFF',
//         tabBarInactiveTintColor: '#666666',
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontFamily: 'Inter-Medium',
//         },
//         tabBarBackground: () => (
//           <BlurView
//             intensity={80}
//             tint='dark'
//             experimentalBlurMethod="dimezisBlurView"
//             style={{
//               // absolute fill object
//               position: 'absolute',
//               // top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               zIndex: 10,
//               borderTopLeftRadius: 20,
//               borderTopRightRadius: 20,
//               // backgroundColor: 'transparent',
//               backgroundColor: 'rgba(0, 0, 0, 0.3)',
//               overflow: 'hidden',
//             }}
//           />
//         )
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           // title: 'Home',
//           tabBarShowLabel: false,
//           tabBarIcon: ({ size, color }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               <View
//                 style={{
//                   position: 'absolute',
//                   bottom: -10, // pushes the half-circle below the icon
//                   width: size * 0.8,
//                   height: size * 0.2,
//                   backgroundColor: '#fff', // or your theme color
//                   borderTopLeftRadius: size,
//                   borderTopRightRadius: size,
//                   zIndex: -1,
//                 }}
//               />
//               <Home size={size} color={color} />
//             </View>
//           )

//         }}
//       />
//       <Tabs.Screen
//         name="sessions"
//         options={{
//           // title: 'Sessions',
//           tabBarIcon: ({ size, color }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               <View
//                 style={{
//                   position: 'absolute',
//                   bottom: -10, // pushes the half-circle below the icon
//                   width: size * 0.8,
//                   height: size * 0.2,
//                   backgroundColor: '#fff', // or your theme color
//                   borderTopLeftRadius: size,
//                   borderTopRightRadius: size,
//                   zIndex: -1,
//                 }}
//               />
//               <MessageCircle size={size} color={color} />
//             </View>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           // title: 'Profile',
//           tabBarIcon: ({ size, color }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               <View
//                 style={{
//                   position: 'absolute',
//                   bottom: -10, // pushes the half-circle below the icon
//                   width: size * 0.8,
//                   height: size * 0.2,
//                   backgroundColor: '#fff', // or your theme color
//                   borderTopLeftRadius: size,
//                   borderTopRightRadius: size,
//                   zIndex: -1,
//                 }}
//               />
//               <User size={size} color={color} />
//             </View>
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
