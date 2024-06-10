import React, {Fragment, useEffect} from 'react';
import {View, Image, SafeAreaView, ImageBackground, Text} from 'react-native';
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
import WritingAnimation from '../../components/WritingAnimation';

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
      <MyStatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      {/* <SafeAreaView style={splashStyles.maincontainer}> */}
      <ImageBackground
        source={BASE}
        style={{
          flex: 1,
          width: WIDTH,
          alignItems: 'center',
          // justifyContent: 'center',
          backgroundColor: 'rgb(255, 0, 0)',
        }}>
        <View
          style={{
            marginTop: HEIGHT * 0.3,
            width: WIDTH * 0.5,
            height: HEIGHT * 0.2,
            // justifyContent: 'space-evenly',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Animated.View style={[styles.logoContainer1, logoStyle]}>
            <Image
              source={require('../../Assets/images/icon.png')}
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'cover',
                alignSelf: 'center',
              }}
            />
          </Animated.View>
          <Animated.View style={[styles.logoContainer, logo2Style]}>
            <LinearGradient
              style={{
                marginTop: 10,
                width: WIDTH * 0.8,
                height: HEIGHT * 0.1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: 'red',
                borderRadius: 25,
              }}
              colors={['#b4000a', '#ff6347']}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                Looply
              </Text>
            </LinearGradient>
          </Animated.View>
        </View>
        <WritingAnimation text="Welcome to looply" />
      </ImageBackground>
      {/* </SafeAreaView> */}
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
