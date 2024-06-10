import React, {Fragment, useEffect} from 'react';
import {View, Image, SafeAreaView} from 'react-native';
import {BRAND} from '../../constants/color';
import LinearGradient from 'react-native-linear-gradient';
import {BASE, LOGO, LOGO2} from '../../constants/imagepath';
import {HEIGHT, MyStatusBar, WIDTH} from '../../constants/config';
import {splashStyles} from './SplashStyles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Splash = ({navigation}) => {
  const logoTranslateY = useSharedValue(HEIGHT);
  const logo2TranslateY = useSharedValue(-HEIGHT);

  useEffect(() => {
    logoTranslateY.value = withTiming(0, {duration: 1000});
    logo2TranslateY.value = withTiming(0, {duration: 1000});

    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  }, []);

  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: logoTranslateY.value}],
    };
  });

  const logo2Style = useAnimatedStyle(() => {
    return {
      transform: [{translateY: logo2TranslateY.value}],
    };
  });

  return (
    <Fragment>
      <MyStatusBar backgroundColor={BRAND} barStyle={'dark-content'} />
      <SafeAreaView style={splashStyles.maincontainer}>
        <LinearGradient
          end={{x: 0, y: 0}}
          start={{x: 0, y: 1}}
          colors={[BRAND, BRAND]}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: WIDTH * 0.5,
              height: HEIGHT * 0.2,
              // justifyContent: 'space-evenly',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Animated.View style={[styles.logoContainer1, logoStyle]}>
              <Image
                source={LOGO}
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </Animated.View>
            <Animated.View style={[styles.logoContainer, logo2Style]}>
              <Image
                source={LOGO2}
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </Animated.View>
          </View>
          <View>
            <Image
              source={BASE}
              style={{
                top: HEIGHT * 0.25,
                height: HEIGHT * 0.2,
                width: WIDTH * 0.9,
                resizeMode: 'cover',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </Fragment>
  );
};

export default Splash;

const styles = {
  logoContainer: {
    height: HEIGHT * 0.09,
    width: WIDTH * 0.75,
  },
  logoContainer1: {
    height: HEIGHT * 0.09,
    width: WIDTH * 0.35,
  },
};
