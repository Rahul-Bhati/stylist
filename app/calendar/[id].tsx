import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

const timeSlots = ['10:00', '13:30', '17:30', '19:30'];

const calendar = [
  [null, null, null, null, null, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, 1, 2, 3, 4, 5, 6],
];

const availableDates = [12, 18, 24, 26, 30];
const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function CalendarScreen() {
  const { id, data } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(18);
  const [selectedTime, setSelectedTime] = useState('10:00');
  
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

  const handleSchedule = () => {
    router.back();
  };

  const renderCalendarDay = (day: number | null, dayIndex: number, weekIndex: number) => {
    if (!day) {
      return <View key={`${weekIndex}-${dayIndex}`} style={styles.emptyDay} />;
    }

    const isAvailable = availableDates.includes(day);
    const isSelected = day === selectedDate;
    const isWeekend = dayIndex >= 5;

    return (
      <TouchableOpacity
        key={`${weekIndex}-${dayIndex}`}
        style={[
          styles.calendarDay,
          isAvailable && styles.availableDay,
          isSelected && styles.selectedDay,
        ]}
        onPress={() => isAvailable && setSelectedDate(day)}
        disabled={!isAvailable}
      >
        <Text
          style={[
            styles.calendarDayText,
            isWeekend && styles.weekendText,
            isAvailable && styles.availableDayText,
            isSelected && styles.selectedDayText,
          ]}
        >
          {day}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity style={styles.monthNavButton}>
            <ChevronLeft size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>MAY</Text>
          <TouchableOpacity style={styles.monthNavButton}>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysContainer}>
          {weekDays.map((day, index) => (
            <Text
              key={index}
              style={[
                styles.weekDayText,
                index >= 5 && styles.weekendDayText,
              ]}
            >
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.calendarContainer}>
          {calendar.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.calendarWeek}>
              {week.map((day, dayIndex) => renderCalendarDay(day, dayIndex, weekIndex))}
            </View>
          ))}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Price: {stylist.price}$</Text>
        </View>

        <View style={styles.timeSlotsContainer}>
          <Text style={styles.timeSlotsTitle}>CHOOSE A TIME</Text>
          <View style={styles.timeSlots}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.selectedTimeSlotText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.scheduleButton} onPress={handleSchedule}>
          <Text style={styles.scheduleButtonText}>Schedule session</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 24,
  },
  monthNavButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  weekDayText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    width: 32,
    textAlign: 'center',
  },
  weekendDayText: {
    color: '#FF6B47',
  },
  calendarContainer: {
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  calendarWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  calendarDay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  availableDay: {
    backgroundColor: '#FF6B47',
  },
  selectedDay: {
    backgroundColor: '#FF6B47',
    transform: [{ scale: 1.1 }],
  },
  emptyDay: {
    width: 32,
    height: 32,
  },
  calendarDayText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
  },
  weekendText: {
    color: '#FF6B47',
  },
  availableDayText: {
    color: '#FFFFFF',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  priceContainer: {
    backgroundColor: '#FF6B47',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  priceText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  timeSlotsContainer: {
    marginBottom: 32,
  },
  timeSlotsTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    letterSpacing: 1,
    marginBottom: 16,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#333333',
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#FFFFFF',
  },
  timeSlotText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  selectedTimeSlotText: {
    color: '#1A1A1A',
  },
  scheduleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  scheduleButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#FF6B47',
    textAlign: 'center',
  },
});