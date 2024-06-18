import React, {useEffect, useRef, useState} from 'react';
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
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import moment from 'moment'; // Import moment
import {HEIGHT, WIDTH} from '../Login/Login';
import {
  BELL,
  ClientVisit,
  ExpenseEntry,
  FOUR,
  LeaveBalance,
  LeaveEntry,
  LeaveStatus,
  ManualPunch,
  Odometer,
  ONE,
  Outdoor,
  Payslip,
  Supervisor,
  Task,
  THREE,
  TWO,
} from '../../constants/imagepath';
import {
  BLACK,
  BLUE,
  BRAND,
  GRAY,
  GREEN,
  ORANGE,
  RED,
  WHITE,
} from '../../constants/color';
import {Icon} from '@rneui/themed';
import {clearAll, getObjByKey} from '../../utils/Storage';
import {checkuserToken} from '../../redux/actions/auth';
import {useDispatch} from 'react-redux';

const get = async () => {
  let tree = await getObjByKey('loginResponse');
  console.log('fredc', tree);
};

const Dashboard = () => {
  const dispatch = useDispatch();
  return (
    <FlatList
      numColumns={4}
      data={[
        {img: LeaveEntry, text: 'Leave Entry'},
        {img: LeaveStatus, text: 'Leave Status'},
        {img: LeaveBalance, text: 'Leave Bal.'},
        {img: LeaveStatus, text: 'C.Off'},
        {img: Outdoor, text: 'Outdoor'},
        {img: ManualPunch, text: 'In/Out'},
        {img: ClientVisit, text: 'Client Visit'},
        {img: Supervisor, text: 'Supervisor'},
        {img: ExpenseEntry, text: 'Expense '},
        {img: Odometer, text: 'Odometer'},
        {img: Payslip, text: 'Payslip'},
        {img: Task, text: 'Task'},
      ]}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            clearAll();
            dispatch(checkuserToken(false));
          }}>
          <View
            style={{
              width: WIDTH * 0.2,
              height: HEIGHT * 0.09,
              padding: 5,
              borderRadius: 10,
              elevation: 8,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={item.img} style={styles.image} />
            <Text
              style={{
                fontSize: 11,
                fontFamily: 'Poppins-Regular',
                color: 'black',
                marginTop: 10,
                textAlign: 'center',
              }}>
              {item.text}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const Report = () => {
  return (
    <FlatList
      numColumns={2}
      data={[
        {img: ONE, text: 'Label'},
        {img: TWO, text: 'Label'},
        {img: THREE, text: 'Label'},
        {img: FOUR, text: 'Label'},
      ]}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
          <Image source={item.img} style={styles.image} />
          <Text style={{fontSize: 14, color: 'black', marginTop: 10}}>
            {item.text}
          </Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const Attendance = () => {
  return (
    <FlatList
      numColumns={2}
      data={[
        {img: LeaveEntry, text: 'Label'},
        {img: TWO, text: 'Label'},
        {img: THREE, text: 'Label'},
        {img: FOUR, text: 'Label'},
      ]}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
          <Image source={item.img} style={styles.image} />
          <Text style={{fontSize: 14, color: 'black', marginTop: 10}}>
            {item.text}
          </Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
        },
        tabBarPressOpacity: 0.1,
        tabBarPressColor: 'white',
      }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="Attendance" component={Attendance} />
    </Tab.Navigator>
  );
};

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [dates, setDates] = useState(generateInitialDates());

  const headerCardHeight = useSharedValue(0);
  const bottomViewTranslateY = useSharedValue(HEIGHT); // Start from bottom
  const flatListRef = useRef(null);

  useEffect(() => {
    headerCardHeight.value = withTiming(HEIGHT * 0.5, {duration: 1500});
    bottomViewTranslateY.value = withTiming(0, {duration: 2000}); // Animate to its final position

    if (flatListRef.current) {
      const todayIndex = dates.findIndex(date =>
        moment(date).isSame(moment(), 'day'),
      );
      if (todayIndex !== -1) {
        flatListRef.current.scrollToIndex({index: todayIndex, animated: true});
        setSelectedDate(dates[todayIndex]);
      }
    }
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

  // Function to generate initial dates
  function generateInitialDates() {
    const initialDates = Array.from({length: 30}, (_, i) =>
      moment()
        .subtract(15 - i, 'days')
        .format('YYYY-MM-DD'),
    );
    // Sort dates in ascending order
    return initialDates.sort((a, b) => moment(a).diff(moment(b)));
  }

  // Function to load more dates
  const loadMoreDates = () => {
    const lastDate = moment(dates[dates.length - 1], 'YYYY-MM-DD');
    const newDates = Array.from({length: 365}, (_, i) =>
      lastDate.subtract(i + 1, 'days').format('YYYY-MM-DD'),
    );
    setDates([...dates, ...newDates]);
  };

  const getItemLayout = (data, index) => ({
    length: WIDTH * 0.18, // Assuming item width is 18% of the screen width
    offset: WIDTH * 0.18 * index - HEIGHT * 0.33, // Adjust offset based on your item width and margin
    index,
  });

  const renderDateItem = ({item}) => {
    console.log('itrmem', item);
    const isSelected = item === selectedDate;
    const isToday = moment(item).isSame(moment(), 'day');
    const textStyle = {
      color: isSelected ? '#b4000a' : 'white',
      fontWeight: isSelected ? 'normal' : 'normal',
    };

    return (
      <TouchableOpacity
        key={item}
        onPress={() => setSelectedDate(item)}
        style={
          {
            // elevation: 15,
          }
        }>
        <View
          style={[
            styles.dateItem,
            isSelected && {
              backgroundColor: 'white',
              width: WIDTH * 0.11,
              height: HEIGHT * 0.1,
              borderRadius: 10,
              elevation: 20,
              padding: 5,
            },
          ]}>
          {/* <Text
            style={[styles.dateText, isToday && styles.todayText, textStyle]}>
            {moment(item).format('MMMM')}
          </Text> */}
          <Text
            style={[styles.dateText, isToday && styles.todayText, textStyle]}>
            {moment(item).format('dd')}
          </Text>
          <Text
            style={[styles.dateText, isToday && styles.todayText, textStyle]}>
            {moment(item).format(' D ')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    get();
  }, []);

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
        <ScrollView
          contentContainerStyle={styles.flexGrow}
          scrollEnabled={false}>
          <Animated.View style={[styles.header, headerStyle]}>
            <LinearGradient
              colors={['#ff6347', '#b4000a']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradient}>
              <View
                style={{
                  marginTop: HEIGHT * 0.05,
                  height: HEIGHT * 0.1,
                  width: WIDTH * 0.9,
                  // backgroundColor: WHITE,
                  borderRadius: 10,
                  // elevation: 20,
                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    height: '35%',
                    width: '50%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.headerText}>Saswat</Text>
                  <Text
                    style={{
                      ...styles.headerText,
                      fontSize: 14,
                    }}>
                    ID: 001 | Admin
                  </Text>
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    alignSelf: 'flex-end',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '22%',
                      height: '50%',
                      borderRadius: 10,
                      elevation: 15,
                      backgroundColor: 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // marginRight: 10,
                    }}>
                    <Image
                      source={BELL}
                      style={{
                        width: '70%',
                        height: '100%',
                        resizeMode: 'contain',
                        tintColor: '#b4000a',
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* line segment */}
              <View
                style={{
                  height: HEIGHT * 0.001,
                  width: WIDTH,
                  backgroundColor: GRAY,

                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              />

              <View
                style={{
                  height: HEIGHT * 0.05,
                  width: WIDTH * 0.95,
                  marginTop: 5,
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    height: '70%',
                    width: '33%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 17,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    Select Date
                  </Text>
                  <Icon
                    name="info-outline"
                    type="MaterialIcons"
                    color="white"
                    size={HEIGHT * 0.029}
                  />
                </View>

                <View
                  style={{
                    height: '70%',
                    width: '35%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingLeft: 5,
                  }}>
                  <Icon
                    name="calendar"
                    type="evilicon"
                    color="white"
                    size={HEIGHT * 0.032}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {moment(selectedDate).format('MMMM')}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {moment(selectedDate).format('YYYY')}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  height: HEIGHT * 0.125,
                  bottom: HEIGHT * 0.03,
                }}>
                <FlatList
                  horizontal
                  ref={flatListRef}
                  getItemLayout={getItemLayout}
                  data={dates}
                  renderItem={renderDateItem}
                  keyExtractor={item => item}
                  contentContainerStyle={styles.dateList}
                  showsHorizontalScrollIndicator={false}
                  // onEndReached={loadMoreDates}
                  onEndReachedThreshold={0.1}
                />
              </View>
            </LinearGradient>
          </Animated.View>
          <Animated.View style={[styles.bottomView, bottomViewStyle]}>
            <View style={styles.searchBar}>
              <View
                style={{
                  width: '100%',
                  height: '30%',
                  alignSelf: 'center',
                  marginLeft: 7,
                  justifyContent: 'space-evenly',
                }}>
                <Text
                  style={{
                    color: BLACK,
                    fontSize: 22,
                    fontFamily: 'Poppins-Bold',
                    paddingTop: 15,
                  }}>
                  Monthly Attendance
                </Text>
                <Text
                  style={{
                    color: BLACK,
                    fontSize: 13,
                    fontFamily: 'Poppins-Regular',
                    paddingTop: 5,
                  }}>
                  {moment(selectedDate).format('LLLL')}
                </Text>
              </View>
              <View
                style={{
                  width: '110%',
                  height: '70%',
                  alignSelf: 'center',
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                  // backgroundColor: 'green',
                  padding: 10,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    // padding: 5,
                  }}>
                  <Text
                    style={{
                      color: BLACK,
                      fontSize: 15,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Present
                  </Text>
                  <Text
                    style={{
                      paddingTop: 5,
                      color: '#09692c',
                      fontSize: 35,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    20
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: '6%',
                    height: '50%',
                    width: '0.1%',
                    backgroundColor: GRAY,
                  }}
                />
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    // padding: 5,
                  }}>
                  <Text
                    style={{
                      color: BLACK,
                      fontSize: 15,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Absent
                  </Text>
                  <Text
                    style={{
                      paddingTop: 5,
                      color: RED,
                      fontSize: 35,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    10
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: '6%',
                    height: '50%',
                    width: '0.11%',
                    backgroundColor: GRAY,
                  }}
                />
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    // padding: 5,
                  }}>
                  <Text
                    style={{
                      color: BLACK,
                      fontSize: 15,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Leave
                  </Text>
                  <Text
                    style={{
                      paddingTop: 5,
                      color: BLUE,
                      fontSize: 35,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    10
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: '6%',
                    height: '50%',
                    width: '0.1%',
                    backgroundColor: GRAY,
                  }}
                />
                <View
                  style={{
                    width: '25%',
                    height: '100%',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    // padding: 5,
                  }}>
                  <Text
                    style={{
                      color: BLACK,
                      fontSize: 15,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    WO/H
                  </Text>
                  <Text
                    style={{
                      paddingTop: 5,
                      color: ORANGE,
                      fontSize: 35,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    10
                  </Text>
                </View>
              </View>
            </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: WIDTH * 0.05,
    borderBottomRightRadius: WIDTH * 0.05,
    overflow: 'hidden', // Ensures children stay within rounded corners
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerText: {
    color: 'white',
    fontSize: 23,
    fontFamily: 'Poppins-Bold',
  },
  dateList: {
    marginTop: 20,
  },
  dateItem: {
    width: WIDTH * 0.155,
    height: HEIGHT * 0.1,
    padding: 5,

    justifyContent: 'space-evenly',
    alignItems: 'center',
    // marginHorizontal: 1,
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
    // justifyContent: 'flex-start', // Align items to the top
  },
  bottomViewText: {
    color: 'black',
    fontSize: 20,
    // marginTop: 20, // Add margin top to space it from the search bar
  },
  searchBar: {
    width: WIDTH * 0.85,
    height: HEIGHT * 0.2,
    bottom: HEIGHT * 0.15,
    elevation: HEIGHT * 0.01,
    paddingTop: 5,
    paddingLeft: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
    zIndex: 999,
  },
  tabContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    marginTop: HEIGHT * 0.08,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    // flex: 1,
    height: HEIGHT * 0.095,
    width: WIDTH * 0.18,

    margin: HEIGHT * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%', // Adjust based on your requirement
    height: HEIGHT * 0.04, // Adjust based on your requirement
    resizeMode: 'contain',
  },
  dateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
