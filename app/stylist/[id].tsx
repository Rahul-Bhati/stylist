import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';
import ProfileCarousel from '@/components/ProfileCarousel';

const { width: screenWidth } = Dimensions.get('window');

export default function StylistDetailScreen() {
  const { id, data } = useLocalSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  
  let stylist;
  try {
    stylist = data ? JSON.parse(data as string) : null;
  } catch (error) {
    stylist = null;
  }

  if (!stylist) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>Stylist not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleScheduleSession = () => {
    router.push(`/calendar/${id}?data=${encodeURIComponent(JSON.stringify(stylist))}`);
  };

  const slides = [
    {
      id: '1',
      image:
        'https://raw.githubusercontent.com/siddnlw/codepen-assets/refs/heads/main/img/MegaGengar.jpg',
      title: 'Gengar',
    },
    {
      id: '2',
      image:
        'https://raw.githubusercontent.com/siddnlw/codepen-assets/refs/heads/main/img/Lugia.jpg',
      title: 'Lugia',
    },
    {
      id: '3',
      image:
        'https://raw.githubusercontent.com/siddnlw/codepen-assets/refs/heads/main/img/MegeLucario.jpg',
      title: 'Mega Lucario',
    },
    {
      id: '4',
      image:
        'https://raw.githubusercontent.com/siddnlw/codepen-assets/refs/heads/main/img/zacian.jpg',
      title: 'Zacian',
    },
    {
      id: '5',
      image:
        'https://raw.githubusercontent.com/siddnlw/codepen-assets/refs/heads/main/img/MegaCharizard.jpg',
      title: 'Mega Charizard',
    },
    {
      id: '6',
      image:
        'https://raw.githubusercontent.com/siddnlw/codepen-assets/refs/heads/main/img/zacianAndZamazenta.jpg',
      title: 'Zacian and Zamazenta',
    },
    {
      id: '7',
      image:
        'https://raw.githubusercontent.com/siddnlw/codepen-assets/refs/heads/main/img/Lucario.jpg',
      title: 'Lucario',
    },
    {
      id: '8',
      image:
        'https://raw.githubusercontent.com/siddnlw/codepen-assets/refs/heads/main/img/Charizard.jpg',
      title: 'Charizard',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View className='flex-1 w-[90%] mx-auto'>
        <ProfileCarousel slides={slides} />
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={styles.content}>
          <Text style={styles.stylistName} className='font-ThunderSemiBold'>{stylist.name}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>PRICE</Text>
              <Text style={styles.statValue}>{stylist.price}$</Text>
            </View>
            
            <View style={styles.stat}>
              <Text style={styles.statLabel}>SESSIONS</Text>
              <Text style={styles.statValue}>{stylist.sessions}</Text>
            </View>
            
            <View style={styles.stat}>
              <Text style={styles.statLabel}>RATING</Text>
              <Text style={styles.statValue}>{stylist.rating}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={styles.learnMoreText}>Learn more</Text>
            <ChevronDown
              size={20}
              color="#FFFFFF"
              style={[styles.chevron, isExpanded && styles.chevronRotated]}
            />
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.expandedContent}>
              <Text style={styles.description}>
                Let me unveil your style potential as your personal stylist. Embrace the captivating world of fashion and beauty, and let it become a platform for showcasing your authentic self.
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleSession}>
            <Text style={styles.scheduleButtonText}>Schedule session</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageCarousel: {
    height: 400,
    position: 'relative',
  },
  carouselScroll: {
    flex: 1,
  },
  carouselImage: {
    width: screenWidth,
    height: 400,
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 100,
  },
  stylistName: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    marginBottom: 4,
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 24,
  },
  learnMoreText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginRight: 8,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  expandedContent: {
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    lineHeight: 24,
  },
  scheduleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  scheduleButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});