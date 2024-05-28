import React, {useEffect, useState, useRef} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import COLORS from '../Constant/Color';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AnimatedButton from '../Constant/Button';
import Color from '../Constant/Color';
import Package from './Package';
import Geolocation from '@react-native-community/geolocation';
import Feather from 'react-native-vector-icons/Feather';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';

const Outstation = ({navigation, route}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const mapRef = useRef();

  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateChange = newDate => {
    setDate(newDate);
  };
  const handlePress = () => {
    // navigation.navigate('SearchVehicle');
  };
  const handlePressPackage = () => {
    navigation.navigate('Package');
  };

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const [longi, setlongi] = useState(null);
  const [lati, setlati] = useState(null);
  const [locationPermissionRequested, setLocationPermissionRequested] =
    useState(false);

  // Location Permission
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Taxi app needs access to your location for using the map.',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Handle permission granted
        console.log('Location permission granted');
      } else {
        // Handle permission denied
        console.log('Location permission denied');
      }

      // Mark that permission has been requested to avoid multiple requests
      setLocationPermissionRequested(true);
    } catch (error) {
      console.log('Location permission request error:', error);
      // Handle the error or display an error message
    }
  };

  useEffect(() => {
    if (!locationPermissionRequested) {
      requestLocationPermission();
    }
  }, [locationPermissionRequested]);

  const handleGetLocation = () => {
    if (!longi) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setlongi(longitude);
          setlati(latitude);
          if (mapRef) {
            mapRef.current.animateToRegion({
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
        },

        error => {
          // Handle error
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleGetLocation();
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log('longi', longi, lati);
  const [address, setAddress] = useState('');
  console.log(address);
  const getGeocodingData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyACW1po0qU1jptIybBPGdFY-_MrycQPjfk`,
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
      }
    } catch (error) {
      console.error('Error getting geocoding data:', error);
    }
  };

  useEffect(() => {
    if (lati && longi) {
      getGeocodingData(lati, longi);
    }
  }, [lati, longi]);
  const [position, setposition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          width: responsiveScreenWidth(35),
          backgroundColor: COLORS.backgroundColor,
          padding: 7,
          borderRadius: 60,
          top: 10,
          marginLeft: 10,
          marginVertical: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack('')}>
          <Feather name="arrow-left" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={styles.newContainer}>
            <View>
              <View
                style={{
                  marginHorizontal: 10,
                }}>
                <Text style={styles.text}>Select pick up location</Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedLanguage(itemValue)
                    }
                    itemStyle={styles.pickerItem}>
                    <Picker.Item label="Bangalore" value="Bangalore" />
                    <Picker.Item label="Bangalore" value="Bangalore" />
                  </Picker>
                </View>

                <Text style={styles.text}>Select Drop up location</Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedLanguage(itemValue)
                    }
                    itemStyle={styles.pickerItem}>
                    <Picker.Item label="Bangalore" value="Bangalore" />
                    <Picker.Item label="Bangalore" value="Bangalore" />
                  </Picker>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginBottom: 5,
                }}>
                <View>
                  <Text style={styles.text}>Pick up date</Text>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.dates}>{date.toDateString()}</Text>
                  </TouchableOpacity>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(false);
                    }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <DatePicker
                          mode="date"
                          date={date}
                          onDateChange={handleDateChange}
                        />
                        <Button
                          title="Close"
                          onPress={() => setModalVisible(false)}
                        />
                      </View>
                    </View>
                  </Modal>
                </View>
                <View>
                  <Text style={styles.text}>Pick up Time</Text>
                  <TouchableOpacity onPress={showTimepicker}>
                    <Text style={styles.dates}>{time.toTimeString()}</Text>
                  </TouchableOpacity>
                  {showTimePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={time}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
              </View>
              <View style={{marginHorizontal: 20}}>
                <AnimatedButton
                  title="Search"
                  onPress={handlePress}></AnimatedButton>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Outstation;

const styles = StyleSheet.create({
  local: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 50,
  },
  carimage: {
    height: 50,
    width: 50,
  },
  containttext: {
    fontSize: 14,
    fontWeight: '600',
  },
  net: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dates: {
    borderWidth: 1,
    borderColor: '#dbd3d340',
    padding: 10,
    borderRadius: 8,
  },
  picker: {
    borderWidth: 1,
    backgroundColor: COLORS.backgroundColor,
    borderColor: '#dbd3d340',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bond: {
    borderBottomWidth: 2,
    borderColor: Color.buttonColor,
  },
  newContainer: {
    backgroundColor: 'white',
    padding: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#dbd3d340',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 25,
  },
  containttext1: {
    color: Color.black,
    fontWeight: '700',
  },
  circle: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#dbd3d340',
  },
  iconmenu: {
    height: 57,
    width: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 35,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#dbd3d340',
  },
  conatintLocal: {
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dbd3d340',
  },
});
