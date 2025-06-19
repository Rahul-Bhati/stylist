import React, { useState } from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MobileSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const translateX = useSharedValue(0);

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

  const handleSlideChange = (delta: number) => {
    const next = currentSlide + delta;
    if (next >= 0 && next < slides.length) {
      setCurrentSlide(next);
    }
  };

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      const threshold = screenWidth * 0.25;
      if (e.translationX > threshold) {
        runOnJS(handleSlideChange)(-1);
      } else if (e.translationX < -threshold) {
        runOnJS(handleSlideChange)(1);
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    zIndex: 999,
  }));

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    translateX.value = withSpring(0);
  };

  const renderCard = (slide: any, index: number) => {
    const offset = index - currentSlide;
    if (offset === 0) return null;

    let transform: any[] = [];
    let zIndex = slides.length - Math.abs(offset);
    let opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2;

    if (offset === 1) {
      transform = [
        { translateX: -30 },
        { translateY: 20 },
        { rotate: '-8deg' },
        { scale: 0.92 },
      ];
    } else if (offset === 2) {
      transform = [
        { translateX: 30 },
        { translateY: 20 },
        { rotate: '8deg' },
        { scale: 0.92 },
      ];
    } else if (offset === 0) {
      transform = [
        { translateX: offset * 40 },
        { translateY: Math.abs(offset) * 15 },
        { scale: 0.85 - Math.abs(offset) * 0.1 },
      ];
    }

    return (
      <Animated.View
        key={slide.id}
        style={[
          styles.card,
          {
            transform,
            opacity,
            position: 'absolute',
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: slide.image }} style={styles.image} />
          <View style={styles.overlay} />
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        {slides.map((slide, index) => {
          if (Math.abs(index - currentSlide) <= 2 && index !== currentSlide) {
            return renderCard(slide, index);
          }
          return null;
        })}
        <GestureHandlerRootView>
          {/* Active Slide */}
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[styles.card, styles.activeCard, animatedStyle]}
            >
              <Image
                source={{ uri: slides[currentSlide].image }}
                style={styles.image}
                resizeMode="cover"
              />
              {/* <View style={styles.overlay} /> */}
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </View>

      {/* Indicators */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => goToSlide(index)}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === currentSlide
                    ? '#FFFFFF'
                    : 'rgba(255, 255, 255, 0.3)',
                width: index === currentSlide ? 24 : 8,
                marginHorizontal: 4,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sliderContainer: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: screenWidth * 0.75,
    height: screenHeight * 0.55,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  activeCard: {
    zIndex: 100,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});

export default MobileSlider;
