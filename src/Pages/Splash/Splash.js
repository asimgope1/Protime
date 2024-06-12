import React, {Fragment, useEffect} from 'react';
import {View, Image, SafeAreaView, ImageBackground} from 'react-native';
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
            {/* <Image
              source={LOGO}
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            /> */}
          </Animated.View>
          <Animated.View style={[styles.logoContainer, logo2Style]}>
            {/* <Image
              source={LOGO2}
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            /> */}
          </Animated.View>
        </View>
        {/* <WritingAnimation text="Welcome to Our App!" /> */}
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
