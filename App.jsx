import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient'; // You need to install react-native-linear-gradient

export const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const headerCardHeight = useSharedValue(0);

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: headerCardHeight.value,
    };
  });

  useEffect(() => {
    headerCardHeight.value = withTiming(HEIGHT * 0.5, {duration: 1500});
  }, []);

  const handleLogin = () => {
    // Implement login logic here
    console.log('Username:', username);
    console.log('Password:', password);
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
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
              <Image source={require('./Assets/images/logo.png')} />
            </View>
          </Animated.View>
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
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
});

export default App;
