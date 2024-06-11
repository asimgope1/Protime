import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import SoundPlayer from 'react-native-sound-player';
import Sound from 'react-native-sound';

export const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [press, setpress] = useState(false);

  const headerCardHeight = useSharedValue(0);
  const loginContainerTranslateY = useSharedValue(HEIGHT);
  const animatedViewTranslateX = useSharedValue(WIDTH);

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: headerCardHeight.value,
    };
  });

  const loginContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: loginContainerTranslateY.value}],
    };
  });

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animatedViewTranslateX.value}],
    };
  });

  useEffect(() => {
    headerCardHeight.value = withTiming(HEIGHT * 0.5, {duration: 1500});
    loginContainerTranslateY.value = withTiming(0, {duration: 1500});
    animatedViewTranslateX.value = withTiming(0, {duration: 1500});

    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleLogin = () => {
    // Implement login logic here
    playSound();
    setpress(true);
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const playSound = () => {
    soundInstance = new Sound('tone.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.error('Failed to load the sound', error);
      } else {
        soundInstance.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
        animated={true}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{flexGrow: 1}}>
          <Animated.View
            style={[
              {
                width: WIDTH,
                height: HEIGHT * 0.6,
                backgroundColor: '#b4000a',
                borderBottomLeftRadius: WIDTH * 0.05,
                borderBottomRightRadius: WIDTH * 0.5,
                alignItems: 'center',
                justifyContent: 'center',
              },
              headerStyle,
            ]}>
            <View
              style={{
                width: WIDTH * 0.8,
                height: WIDTH * 0.8,
                borderRadius: WIDTH * 0.4,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              {press === true ? (
                <Image
                  source={require('../../Assets/images/sagar.jpg')}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: WIDTH * 0.4,
                    resizeMode: 'cover',
                  }}
                />
              ) : (
                <></>
              )}
            </View>
          </Animated.View>
          <Animated.View style={[styles.loginContainer, loginContainerStyle]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Employee Id"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <LinearGradient
                colors={['#b4000a', '#ff6347']}
                style={styles.buttonBackground}>
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 10,
                height: HEIGHT * 0.02,
                width: WIDTH * 0.9,
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: HEIGHT * 0.001,
                  width: WIDTH * 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'black',
                }}></View>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontSize: 13,
                  fontWeight: '700',
                }}>
                Offline Mode
              </Text>
              <View
                style={{
                  height: HEIGHT * 0.001,
                  width: WIDTH * 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'black',
                }}></View>
            </View>
            <Animated.View style={[styles.animatedView, animatedViewStyle]}>
              <TouchableOpacity style={styles.box}>
                <Image
                  source={require('../../Assets/images/squareserver.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 10,
                  }}>
                  Server Setup
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box}>
                <Image
                  source={require('../../Assets/images/squarevisit.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 10,
                  }}>
                  Client Visit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box}>
                <Image
                  source={require('../../Assets/images/squaresupervisor.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 10,
                  }}>
                  Supervisor Corner
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box}>
                <Image
                  source={require('../../Assets/images/squareodometer.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 10,
                  }}>
                  Odometer Entry
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'black',
    width: WIDTH * 0.8,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: WIDTH * 0.8,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  animatedView: {
    width: WIDTH,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    padding: 10,
  },
  box: {
    width: '22%',
    height: WIDTH * 0.12,
    borderRadius: 10,
  },
});
