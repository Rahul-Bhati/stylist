import { StyleSheet, View, Image } from 'react-native';
import PagerView from 'react-native-pager-view';

export default function WelcomeCarousel() {
  return (
    <View className='flex-grow pb-0 mb-0'>
      <PagerView style={styles.container} initialPage={0} >
        <View style={styles.page} key="1">
          <Image source={require("../assets/images/1.png")} alt='poster-1' className="w-full h-full first-line: object-contain" />
        </View>
        {/* <View style={styles.page} key="2">
          <Image source={require("../assets/images/2.png")} alt='poster-2' className="w-full h-full object-contain" />
        </View>
        <View style={styles.page} key="3">
          <Image source={require("../assets/images/3.png")} alt='poster-3' className="w-full h-full object-contain" />
        </View> */}
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
  },
});
