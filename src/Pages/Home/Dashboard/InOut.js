import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {getObjByKey} from '../../../utils/Storage';
import SQLitePlugin from 'react-native-sqlite-2';
import {HEIGHT, WIDTH} from '../../../constants/config';
import {BLACK, GRAY, RED, WHITE} from '../../../constants/color';
import Header from '../../../components/Header';
import {CheckBox, Icon} from '@rneui/themed';
import {Picker} from '@react-native-picker/picker';
import {green} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import LinearGradient from 'react-native-linear-gradient';
import WebView from 'react-native-webview';

const InOut = ({navigation}) => {
  const [clientUrl, setClientUrl] = useState('');
  const [Id, setID] = useState();
  const [Sl, setSl] = useState();
  const [loading, setLoading] = useState(true);
  const [Balance, setBalance] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveType, setLeaveType] = useState('');
  const [status, setstatus] = useState('');
  const [url, setUrl] = useState('');
  const [Latitude, setLatitude] = useState('');
  const [Longitude, setLongitude] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      leaveList(Id);
    }, 100);
    timeoutId;
  }, [Id, leaveList]);

  useEffect(async () => {
    const location = await getObjByKey('location');
    if (location) {
      console.log('loc', location);
      setLatitude(location.latitude);
      setLongitude(location.longitude);
      setUrl(
        `https://www.google.com/maps/@${location.latitude},${location.longitude},17z?entry=ttu`,
      );
    }
  }, []);

  const handleApplyLeave = () => {
    let half = 1; // Default value assuming full day leave
    if (fullDay) {
      half = 1;
    } else if (halfDay) {
      half = 0.5;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      loc_cd: Id,
      staf_sl: Sl,
      from_dt: fromDate,
      to_dt: toDate,
      leave_tp: 'N',
      reason: reason,
      contact: contact,
      emailid: email,
      leave_nm: leaveType,
      half: half,
    });

    console.log('raw', raw);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${clientUrl}api/leaveapply`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Code === '200') {
          alert(result.msg);
        }
        console.log('applyyy', result);
      })
      .catch(error => console.error(error));
  };

  const leaveList = async loc => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      loc_cd: Id,
      staf_sl: Sl,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        `${clientUrl}/api/divisiondisplay`,
        requestOptions,
      );

      const result = await response.json();
      setLoading(false);
      console.log('saf', result.data_value);
      if (result.data_value) {
        const leaveTypesData = result.data_value.map(item => ({
          label: item.div_nm,
          value: item.div_nm,
        }));
        setLeaveTypes(leaveTypesData);
      } else {
        console.error('Unexpected response structure:', result);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching leave list:', error);
    }
  };

  const LeaveSelected = async item => {
    console.log('Selected leave type:', item);
    setLeaveType(item);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      staf_sl: Sl,
      loc_cd: Id,
      leave_nm: item,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        `${clientUrl}/api/leavebalance`,
        requestOptions,
      );
      const result = await response.json();
      setBalance(result.Leave_balance);
    } catch (error) {
      console.error('Error fetching leave balance:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const db = SQLitePlugin.openDatabase({
    name: 'test.db',
    version: '1.0',
    description: '',
    size: 1,
  });

  const fetchClientUrlFromSQLite = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT client_url FROM ApiResponse ORDER BY id DESC LIMIT 1',
          [],
          (_, {rows}) => {
            const url = rows.item(0)?.client_url || '';
            setClientUrl(url);
            resolve();
          },
          error => {
            console.error('Error fetching client_url:', error);
            reject(error);
          },
        );
      });
    });
  };

  const RetrieveDetails = async () => {
    try {
      const value = await getObjByKey('loginResponse');
      if (value !== null) {
        console.log('value', value);
        setID(value[0]?.loc_cd);
        setSl(value[0]?.staf_sl);
      }
    } catch (e) {
      console.error('Error retrieving details:', e);
    }
  };

  const initialize = async () => {
    try {
      await fetchClientUrlFromSQLite();
      await RetrieveDetails();
    } catch (error) {
      console.error('Initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (Id && Sl && clientUrl) {
      fetchLeaveBalance(Id, Sl);
    }
  }, [Id, Sl, clientUrl]);

  const fetchLeaveBalance = async (ID, SL) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        loc_cd: ID,
        staf_sl: SL,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        `${clientUrl}api/divisiondisplay`,
        requestOptions,
      );
      const result = await response.json();
      if (result.Code === '200') {
        setBalance(result.data_value);
      }
      console.log('balance', result);
    } catch (error) {
      console.error('Error fetching leave balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColorByName = name => {
    switch (name) {
      case 'Paid Leave':
        return styles.paidLeave;
      case 'Casual Leave':
        return styles.casualLeave;
      case 'Sick Leave':
        return styles.sickLeave;
      default:
        return styles.defaultLeave;
    }
  };

  const renderItem = ({item}) => {
    console.log('item', item);
    let color = '';
    if (item.Name === 'Paid Leave') {
      color = 'green';
    } else if (item.Name === 'Casual Leave') {
      color = 'orange';
    } else if (item.Name === 'Sick Leave') {
      color = 'red';
    } else {
      color = 'black';
    }

    return (
      <View
        style={{
          ...styles.card,
          borderColor: color,
        }}>
        <View style={styles.rightContainer}>
          <Text style={[styles.nameText, getColorByName(item.Name)]}>
            {item.Name}
          </Text>
        </View>
        <View style={styles.separator}></View>

        <View style={styles.leftContainer}>
          <Text style={styles.balanceText}>{item.Balance}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={RED} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent={true}
        animated={true}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Header title="In Out" onBackPress={() => navigation.goBack()} />
        <WebView
          source={{
            uri: url,
          }}
          style={{flex: 1}}
        />
        {/* <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          scrollEnabled={true}>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateText}>
              {currentDateTime.toLocaleDateString('en-GB')}
            </Text>
            <Text style={styles.timeText}>
              {currentDateTime.toLocaleTimeString()}
            </Text>
          </View>
          <View
            style={{
              width: WIDTH * 0.95,
              height: HEIGHT * 0.038,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text
              style={{
                color: BLACK,
                fontSize: 14,
                marginBottom: 10,
                fontFamily: 'Poppins-Bold',
              }}>
              Division Type
            </Text>
          </View>
          <Picker
            selectedValue={leaveType}
            dropdownIconColor={BLACK}
            style={styles.picker}
            onValueChange={LeaveSelected}>
            <Picker.Item label="Select Division type" value="" />
            {leaveTypes.map((item, index) => (
              // console.log(item),

              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>

          <View style={styles.checklistContainer}>
            <CheckBox
              title="Attendance"
              checked={status === 'Attendance'}
              onPress={() => {
                setstatus('Attendance');
              }}
            />
            <CheckBox
              title="Work from Home"
              checked={status === 'Work from Home'}
              onPress={() => {
                setstatus('Work from Home');
              }}
            />
            <CheckBox
              title="Tour"
              checked={status === 'Tour'}
              onPress={() => {
                setstatus('Tour');
              }}
            />
            <CheckBox
              title="Outdoor"
              checked={status === 'Outdoor'}
              onPress={() => {
                setstatus('Outdoor');
              }}
            />
          </View>

          <TextInput
            style={styles.textinput}
            placeholderTextColor={GRAY}
            placeholder="Comments"
            multiline={true}
          />

          <TouchableOpacity style={styles.button} onPress={handleApplyLeave}>
            <LinearGradient
              colors={['#b4000a', '#ff6347']}
              style={styles.button}>
              <Text style={styles.buttonText}>Submit Attendance</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InOut;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    // alignSelf: 'center',
    // alignItems: 'center',
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    width: WIDTH * 0.95,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH * 0.9,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
  },
  balanceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: 'black',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-start', // Align items to the left
  },
  nameText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: 'black',
  },
  paidLeave: {
    color: 'green',
  },
  casualLeave: {
    color: 'orange',
  },
  sickLeave: {
    color: 'red',
  },
  defaultLeave: {
    color: 'black',
  },
  flex: {
    flex: 1,
  },
  dateTimeContainer: {
    width: WIDTH * 0.6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: BLACK,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  timeText: {
    color: BLACK,
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  picker: {
    width: WIDTH * 0.95,
    color: BLACK,
    backgroundColor: WHITE,
    marginBottom: 20,
    borderWidth: 1,
    elevation: 4,
    borderColor: RED,
  },
  checklistContainer: {
    width: WIDTH * 0.95,
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 10,
  },
  textinput: {
    width: WIDTH * 0.85,
    height: HEIGHT * 0.15,
    backgroundColor: WHITE,
    marginBottom: 20,
    borderWidth: 1,
    elevation: 4,
    borderColor: RED,
    padding: 10,
    color: BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  button: {
    width: WIDTH * 0.8,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: HEIGHT * 0.1,
    marginBottom: 10,
    overflow: 'visible',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
