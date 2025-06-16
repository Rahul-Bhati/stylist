import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

const upcomingSession = {
  id: '1',
  stylist: 'Emily Johnson',
  price: 110,
  date: '15.05.2023',
  time: '13:30',
  hashtag: '#CasualCool',
  image: 'https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg',
  backgroundColor: '#FF6B47',
};

const previousSessions = [
  {
    id: '2',
    stylist: 'Evelyn Scott',
    price: 70,
    date: '02.04.2023',
    image: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg',
    backgroundColor: '#F5B942',
  },
];

export default function SessionsScreen() {
  const handleOpenChat = (sessionId: string) => {
    router.push(`/chat/${sessionId}`);
  };

  const handleReschedule = () => {
    // Handle reschedule logic
  };

  const handleCancel = () => {
    // Handle cancel logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          <Text style={styles.boldTitle}>Stylists</Text>
          <Text style={styles.lightTitle}> Sessions</Text>
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Upcoming Session */}
        <View style={[styles.upcomingCard, { backgroundColor: upcomingSession.backgroundColor }]}>
          <View style={styles.upcomingHeader}>
            <Text style={styles.priceText}>Price: {upcomingSession.price}$</Text>
            <View style={styles.hashtagContainer}>
              <Text style={styles.hashtagText}>{upcomingSession.hashtag}</Text>
            </View>
          </View>

          <Image source={{ uri: upcomingSession.image }} style={styles.upcomingImage} />

          <View style={styles.upcomingInfo}>
            <Text style={styles.stylistName}>{upcomingSession.stylist}</Text>
            <Text style={styles.sessionDateTime}>
              {upcomingSession.date},{'\n'}{upcomingSession.time}
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.chatButton}
            onPress={() => handleOpenChat(upcomingSession.id)}
          >
            <Text style={styles.chatButtonText}>Open chat session</Text>
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.rescheduleButton} onPress={handleReschedule}>
              <Text style={styles.rescheduleButtonText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Previous Sessions */}
        <Text style={styles.sectionTitle}>Previous sessions</Text>
        
        {previousSessions.map((session) => (
          <View key={session.id} style={[styles.previousCard, { backgroundColor: session.backgroundColor }]}>
            <View style={styles.previousInfo}>
              <Text style={styles.previousPrice}>Price: {session.price}$</Text>
              <Text style={styles.previousStylist}>{session.stylist}</Text>
              <Text style={styles.previousDate}>{session.date}</Text>
            </View>
            <Image source={{ uri: session.image }} style={styles.previousImage} />
          </View>
        ))}
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    color: '#FFFFFF',
  },
  boldTitle: {
    fontFamily: 'Inter-Bold',
  },
  lightTitle: {
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  upcomingCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  upcomingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  hashtagContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  hashtagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  upcomingImage: {
    width: 120,
    height: 160,
    borderRadius: 12,
    position: 'absolute',
    right: 20,
    top: 60,
  },
  upcomingInfo: {
    marginBottom: 24,
    paddingRight: 140,
  },
  stylistName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sessionDateTime: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  chatButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  chatButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FF6B47',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  previousCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previousInfo: {
    flex: 1,
  },
  previousPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  previousStylist: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  previousDate: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  previousImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
  },
});