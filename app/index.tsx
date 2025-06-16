
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import WelcomeCarousel from '@/components/WelcomeCarousel';
import Button from '@/components/Button';

export default function WelcomeScreen() {
  const handleSignUp = () => {
    router.push('/(tabs)');
  };

  const handleLogIn = () => {
    router.push('/(tabs)');
  };


  return (
    <SafeAreaView className="flex flex-col h-screen bg-[#FF6B47]">
      <View className="flex h-[65%] justify-end ">
        <WelcomeCarousel />
      </View>

      <View className="flex h-[35%] bg-secondary rounded-[30px] px-6 pt-8 pb-4 justify-between">
        <Text className="text-3xl sm:text-3xl md:text-4xl font-WorkSansRegular text-white text-center leading-[36px] mb-8">
          No need to be alone{'\n'}in the room
        </Text>

        <View className="flex-row justify-between gap-4 mb-6">
          <Button onPress={handleLogIn} className='flex-1 bg-dark-grey border border-[#333333] rounded-[25px] p-4 items-center' textClassName='text-white text-base font-WorkSansBold'>
            Log In
          </Button>
          <Button onPress={handleSignUp} className='flex-1 bg-white rounded-[25px] p-4 items-center' textClassName='text-[#1A1A1A] text-base font-WorkSansBold'>
            Sign Up
          </Button>
        </View>

        <View className="w-[134px] h-[5px] bg-white rounded-[2.5px] self-center" />
      </View>
    </SafeAreaView>
  );
}

// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
// import { router } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// export default function WelcomeScreen() {
//   const handleSignUp = () => {
//     router.push('/(tabs)');
//   };

//   const handleLogIn = () => {
//     router.push('/(tabs)');
//   };

//   return (
//     <SafeAreaView className='flex-1 bg-primary'>
//       <View className='flex-auto w-[100%]'>
//         <Image
//           source={{ uri: 'https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg' }}
//           style={styles.heroImage}
//           resizeMode="cover"
//         />
//       </View>

//       <View className='flex bg-secondary rounded-t-20'>
//         <Text style={styles.title}>No need to be alone{'\n'}in the room</Text>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
//             <Text style={styles.logInButtonText}>Log In</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
//             <Text style={styles.signUpButtonText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.homeIndicator} />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FF6B47',
//   },
//   imageContainer: {
//     flex: 0.7,
//     width: '100%',
//   },
//   heroImage: {
//     width: '100%',
//     height: '100%',
//   },
//   contentContainer: {
//     flex: 0.3,
//     backgroundColor: '#1A1A1A',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingHorizontal: 24,
//     paddingTop: 32,
//     paddingBottom: 16,
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 28,
//     fontFamily: 'Inter-Bold',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     lineHeight: 36,
//     marginBottom: 32,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 16,
//     marginBottom: 24,
//   },
//   logInButton: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: '#333333',
//     borderRadius: 25,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   logInButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontFamily: 'Inter-Medium',
//   },
//   signUpButton: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 25,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   signUpButtonText: {
//     color: '#1A1A1A',
//     fontSize: 16,
//     fontFamily: 'Inter-Medium',
//   },
//   homeIndicator: {
//     width: 134,
//     height: 5,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 2.5,
//     alignSelf: 'center',
//   },
// });
