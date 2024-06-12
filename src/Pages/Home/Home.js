import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HEIGHT, WIDTH} from '../Login/Login';

const HomeScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Home Screen Content</Text>
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Settings Screen Content</Text>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const Home = () => {
  const headerCardHeight = useSharedValue(0);
  const bottomViewTranslateY = useSharedValue(HEIGHT); // Start from bottom

  useEffect(() => {
    headerCardHeight.value = withTiming(HEIGHT * 0.5, {duration: 1500});
    bottomViewTranslateY.value = withTiming(0, {duration: 2000}); // Animate to its final position
  }, []);

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: headerCardHeight.value,
    };
  });

  const bottomViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: bottomViewTranslateY.value}],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
        animated={true}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.flexGrow}>
          <Animated.View style={[styles.header, headerStyle]}>
            <LinearGradient
              colors={['#ff6347', '#b4000a']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradient}>
              <Text style={styles.headerText}>Welcome Home!</Text>
            </LinearGradient>
          </Animated.View>
          <Animated.View style={[styles.bottomView, bottomViewStyle]}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              placeholderTextColor="#888"
            />
            <View style={styles.tabContainer}>
              <TopTabs />
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  header: {
    width: WIDTH,
    borderBottomLeftRadius: WIDTH * 0.05,
    borderBottomRightRadius: WIDTH * 0.05,
    overflow: 'hidden', // Ensures children stay within rounded corners
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: WIDTH * 0.99,
    height: HEIGHT * 0.6,
    backgroundColor: 'white',
    alignSelf: 'center',
    elevation: HEIGHT * 0.2,
    alignItems: 'center',
    borderTopLeftRadius: WIDTH * 0.05,
    borderTopRightRadius: WIDTH * 0.05,
    justifyContent: 'flex-start', // Align items to the top
    paddingTop: 20, // Add some padding at the top
  },
  bottomViewText: {
    color: 'black',
    fontSize: 20,
    marginTop: 20, // Add margin top to space it from the search bar
  },
  searchBar: {
    width: WIDTH * 0.85,
    height: HEIGHT * 0.065,
    bottom: HEIGHT * 0.06,
    elevation: HEIGHT * 0.01,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 20, // Add some margin bottom to space it from the other content
  },
  tabContainer: {
    flex: 1,
    width: '100%',
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
