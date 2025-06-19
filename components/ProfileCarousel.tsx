import { StyleSheet, View, Image } from 'react-native';
import PagerView from 'react-native-pager-view';

export default function ProfileCarousel({ slides }: { slides: any }) {
  return (
    <View className="flex-1 pb-0 mb-0">
      <PagerView style={styles.container} initialPage={0}>
        {slides.map((slide: any, index: number) => (
          <View style={styles.page} key={index}>
            <Image
              source={{ uri: slide.image }}
              alt={`poster-${index + 1}`}
              className="w-full h-full object-contain"
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
  },
  page: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
    overflow: 'hidden',
  },
});
