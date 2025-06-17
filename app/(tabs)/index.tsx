import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Filter } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - 48) / 2 - 8;

const stylists = [
  {
    id: '1',
    name: 'Emily Johnson',
    price: 110,
    rating: 4.9,
    sessions: 43,
    image: '../../assets/images/1.png',
    backgroundColor: '#FF6B47',
  },
  {
    id: '2',
    name: 'James Wilson',
    price: 350,
    rating: 5.0,
    sessions: 28,
    image: '../../assets/images/2.png',
    backgroundColor: '#B8A678',
  },
  {
    id: '3',
    name: 'Benjamin Davis',
    price: 95,
    rating: 4.8,
    sessions: 67,
    image: '../../assets/images/3.png',
    backgroundColor: '#8BC4A0',
  },
  {
    id: '4',
    name: 'Olivia Thompson',
    price: 70,
    rating: 4.8,
    sessions: 52,
    image: '../../assets/images/1.png',
    backgroundColor: '#4A90C2',
  },
  {
    id: '5',
    name: 'Michael Brown',
    price: 125,
    rating: 4.9,
    sessions: 34,
    image: '../../assets/images/2.png',
    backgroundColor: '#E8A5A5',
  },
  {
    id: '6',
    name: 'Sarah Lee',
    price: 180,
    rating: 4.8,
    sessions: 41,
    image: '../../assets/images/3.png',
    backgroundColor: '#F5B942',
  },
];

export default function HomeScreen() {
  const handleStylistPress = (stylist: any) => {
    router.push(`/stylist/${stylist.id}?data=${encodeURIComponent(JSON.stringify(stylist))}`);
  };

  const getCardHeight = (index: number) => {
    // Pattern: 1st (280), 2nd (250), 3rd (250), 4th (280), 5th (280), 6th (250)
    const pattern = [280, 250, 250, 280, 280, 250];
    return pattern[index % 6];
  };

  const renderStylistCard = (stylist: any, index: number) => (
    <TouchableOpacity
      key={stylist.id}
      className="rounded-[30px] mb-2"
      style={{
        width: cardWidth,
        height: getCardHeight(index),
        backgroundColor: stylist.backgroundColor,

      }}
      onPress={() => handleStylistPress(stylist)}
    >
      <View className="flex-row items-center px-2 py-1 rounded-xl self-start font-WorkSansBold absolute top-3 right-2 z-10">
        <Text className="text-white text-xs mr-1 font-WorkSansBold">★</Text>
        <Text className="text-white text-xs font-WorkSansBold">{stylist.rating}</Text>
      </View>
      
      <Image
        source={require("../../assets/images/1.png")}
        className="w-full h-full absolute rounded-xl self-center"
      />
 
      <View className="absolute bottom-1 left-2 z-10 rounded-full bg-dark-grey/90 p-2 px-4 w-[90%]">
        <Text className="text-white text-lg font-bold font-WorkSansBold">{stylist.price}$</Text>
        <Text className="text-white text-sm opacity-90 font-WorkSansRegular">{stylist.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row justify-between items-center px-6 pt-4 pb-6">
        <Text className="text-white text-2xl">
          <Text className="font-bold">Stylists</Text>
          <Text className="text-[#666666] font-normal"> Sessions</Text>
        </Text>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-grey-400 justify-center items-center">
          <Filter size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between pb-24">
          {stylists.map((stylist, index) => renderStylistCard(stylist, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { router } from 'expo-router';
// import { Filter } from 'lucide-react-native';

// const { width: screenWidth } = Dimensions.get('window');
// const cardWidth = (screenWidth - 48) / 2 - 8;

// const stylists = [
//   {
//     id: '1',
//     name: 'Emily Johnson',
//     price: 110,
//     rating: 4.9,
//     sessions: 43,
//     image: 'https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg',
//     backgroundColor: '#FF6B47',
//   },
//   {
//     id: '2',
//     name: 'James Wilson',
//     price: 350,
//     rating: 5.0,
//     sessions: 28,
//     image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg',
//     backgroundColor: '#B8A678',
//   },
//   {
//     id: '3',
//     name: 'Benjamin Davis',
//     price: 95,
//     rating: 4.8,
//     sessions: 67,
//     image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
//     backgroundColor: '#8BC4A0',
//   },
//   {
//     id: '4',
//     name: 'Olivia Thompson',
//     price: 70,
//     rating: 4.8,
//     sessions: 52,
//     image: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg',
//     backgroundColor: '#4A90C2',
//   },
//   {
//     id: '5',
//     name: 'Michael Brown',
//     price: 125,
//     rating: 4.9,
//     sessions: 34,
//     image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
//     backgroundColor: '#E8A5A5',
//   },
//   {
//     id: '6',
//     name: 'Sarah Lee',
//     price: 180,
//     rating: 4.8,
//     sessions: 41,
//     image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg',
//     backgroundColor: '#F5B942',
//   },
// ];

// export default function HomeScreen() {
//   const handleStylistPress = (stylist: any) => {
//     router.push(`/stylist/${stylist.id}?data=${encodeURIComponent(JSON.stringify(stylist))}`);
//   };

//   const renderStylistCard = (stylist: any, index: number) => (
//     <TouchableOpacity
//       key={stylist.id}
//       style={[
//         styles.stylistCard,
//         { backgroundColor: stylist.backgroundColor },
//         index % 2 === 0 ? { height: 280 } : { height: 220 },
//       ]}
//       onPress={() => handleStylistPress(stylist)}
//     >
//       <View style={styles.ratingContainer}>
//         <Text style={styles.ratingIcon}>★</Text>
//         <Text style={styles.ratingText}>{stylist.rating}</Text>
//       </View>
      
//       <Image source={{ uri: stylist.image }} style={styles.stylistImage} />
      
//       <View style={styles.stylistInfo}>
//         <Text style={styles.stylistPrice}>{stylist.price}$</Text>
//         <Text style={styles.stylistName}>{stylist.name}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>
//           <Text style={styles.boldTitle}>Stylists</Text>
//           <Text style={styles.lightTitle}> Sessions</Text>
//         </Text>
//         <TouchableOpacity style={styles.filterButton}>
//           <Filter size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         <View style={styles.stylistsGrid}>
//           {stylists.map((stylist, index) => renderStylistCard(stylist, index))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1A1A1A',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingTop: 16,
//     paddingBottom: 24,
//   },
//   headerTitle: {
//     fontSize: 28,
//     color: '#FFFFFF',
//   },
//   boldTitle: {
//     fontFamily: 'Inter-Bold',
//   },
//   lightTitle: {
//     fontFamily: 'Inter-Regular',
//     color: '#666666',
//   },
//   filterButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#333333',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollView: {
//     flex: 1,
//     paddingHorizontal: 24,
//   },
//   stylistsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingBottom: 100,
//   },
//   stylistCard: {
//     width: cardWidth,
//     borderRadius: 20,
//     marginBottom: 16,
//     padding: 16,
//     justifyContent: 'space-between',
//   },
//   leftCard: {
//     marginRight: 8,
//   },
//   rightCard: {
//     marginLeft: 8,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   ratingIcon: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     marginRight: 4,
//   },
//   ratingText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontFamily: 'Inter-Medium',
//   },
//   stylistImage: {
//     width: 80,
//     height: 120,
//     borderRadius: 12,
//     alignSelf: 'center',
//     marginVertical: 8,
//   },
//   stylistInfo: {
//     alignItems: 'flex-start',
//   },
//   stylistPrice: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontFamily: 'Inter-Bold',
//     marginBottom: 4,
//   },
//   stylistName: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontFamily: 'Inter-Regular',
//     opacity: 0.9,
//   },
// });