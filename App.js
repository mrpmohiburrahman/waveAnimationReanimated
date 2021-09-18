import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const AnimatedSvg = Animated.createAnimatedComponent(Svg)

export default function App() {
  const secondWaveOffset = -80
  const thirdWaveOffset = -180
  const waveHeight = ( HEIGHT/1.4 )
  const waveOffset = useSharedValue(0);

  useEffect(()=>{
    waveOffset.value = withRepeat(
      withTiming(
        (WIDTH), 
        { 
          duration:6000,
          easing: Easing.linear
        }
      ), 
      -1, 
      false)
  },[])

  const AnimatedStyles = {
    wavTranslateX: useAnimatedStyle(()=>{
      return{
        transform: [{ translateX: waveOffset.value }],
      }
    })
  }

  const PATH1 = `
      M0 ${waveHeight} 
      Q${WIDTH/4} ${(waveHeight)+20} ${WIDTH/2} ${waveHeight}
      T${WIDTH} ${waveHeight}
      T${(WIDTH/2)*3} ${waveHeight}
      T${(WIDTH/2)*4} ${waveHeight}
      L ${(WIDTH/2)*4} ${HEIGHT} L 0 ${HEIGHT} Z
      `;
  const PATH2 =`
      M${secondWaveOffset} ${(waveHeight)} 
      Q${(WIDTH/4)+secondWaveOffset} ${(waveHeight)+20} ${(WIDTH/2)+secondWaveOffset} ${waveHeight}
      T${WIDTH+secondWaveOffset} ${waveHeight}
      T${((WIDTH/2)*3)+secondWaveOffset} ${waveHeight}
      T${((WIDTH/2)*4)+secondWaveOffset} ${waveHeight}
      L ${(WIDTH/2)*4} ${HEIGHT} L 0 ${HEIGHT} Z
      `;
  const PATH3 =`
      M${thirdWaveOffset} ${(waveHeight)} 
      Q${(WIDTH/4)+thirdWaveOffset} ${(waveHeight)+30} ${(WIDTH/2)+thirdWaveOffset} ${waveHeight}
      T${WIDTH+thirdWaveOffset} ${waveHeight}
      T${((WIDTH/2)*3)+thirdWaveOffset} ${waveHeight}
      T${((WIDTH/2)*4)+thirdWaveOffset} ${waveHeight}
      L ${(WIDTH/2)*4} ${HEIGHT} L 0 ${HEIGHT} Z
      `;
  
  return (
    <View style={styles.container}>
      <AnimatedSvg 
        width={WIDTH*3}
        height={HEIGHT}
        viewBox="0 0 100% 100%"
        style={[
          styles.svgAbsolutePosition,
          AnimatedStyles.wavTranslateX
        ]}>
          <Path d={PATH3} fill="#1F73E5"/>
          <Path d={PATH2} fill="#5E9DED"/>
          <Path d={PATH1} fill="#0965E2"/>
      </AnimatedSvg>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgAbsolutePosition: {
      position: 'absolute',
      right: -(WIDTH),
      bottom: 0,
    }
});
