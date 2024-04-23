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
import MapView, {Marker, PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const Home = ({navigation, route}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedValue, setSelectedValue] = useState(null);

  const mapRef = useRef();

  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateChange = newDate => {
    setDate(newDate);
  };
  const handlePress = () => {
    navigation.navigate('SearchVehicle');
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

  const [acc, setAcc] = useState(true);
  const [acc1, setAcc1] = useState(false);
  const [acc2, setAcc2] = useState(false);

  const handleChange1 = () => {
    setAcc(true);
    setAcc1(false);
    setAcc2(false);
  };
  const handleChange2 = () => {
    setAcc(false);
    setAcc1(true);
    setAcc2(false);
  };
  const handleChange3 = () => {
    setAcc(false);
    setAcc1(false);
    setAcc2(true);
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
          // if (mapRef) {
          //   mapRef.current.animateToRegion({
          //     latitude: latitude,
          //     longitude: longitude,
          //     latitudeDelta: 0.005,
          //     longitudeDelta: 0.005,
          //   });
          // }
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
      <ScrollView>
        <View style={{flex: 1}}>
          <View>
            {/* <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={position}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={false}
              showsMyLocationButton={false}
              followsUserLocation={true}
              showsCompass={true}
              scrollEnabled={true}
              zoomEnabled={true}
              height={280}
              width={400}
              pitchEnabled={true}
              rotateEnabled={true}>
              {lati & longi ? (
                <>
                  <Marker
                    // description="delievry person"
                    coordinate={{
                      latitude: parseFloat(lati),
                      longitude: parseFloat(longi),
                    }}>
                    <Image
                    style={{width: 20, height: 30}}
                    source={require('../assets/images/man.png')}
                  />
                  </Marker>
                </>
              ) : (
                <></>
              )}
            </MapView> */}
            <Image
              source={require('../Assets/map.png')}
              style={{height: 280, width: 400}}
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                right: 18,
                top: 15,
                left: 18,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <View style={styles.iconmenu}>
                  <Ionicons name="menu" size={27} color={Color.black} />
                </View>
              </TouchableOpacity>
              <View style={styles.circle}>
                <Entypo name="circle" size={18} color="green" />
                <TextInput
                  style={{flex: 1}}
                  numberOfLines={2}
                  placeholder="Current location"
                  // placeholder={address}
                  placeholderTextColor={Color.black}
                />
              </View>
            </View>

            <View style={styles.conatintLocal}>
              <View style={styles.local}>
                <TouchableOpacity
                  style={acc ? styles.bond : styles.net}
                  onPress={handleChange1}>
                  <Image
                    source={require('../Assets/car.png')}
                    resizeMode="contain"
                    style={styles.carimage}
                  />
                  <Text
                    style={acc ? styles.containttext1 : styles.containttext}>
                    Local
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={acc1 ? styles.bond : styles.net}
                  onPress={handleChange2}>
                  <Image
                    source={require('../Assets/car.png')}
                    resizeMode="contain"
                    style={styles.carimage}
                  />
                  <Text
                    style={acc1 ? styles.containttext1 : styles.containttext}>
                    Outstation
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={acc2 ? styles.bond : styles.net}
                  onPress={handleChange3}>
                  <Image
                    source={require('../Assets/car.png')}
                    resizeMode="contain"
                    style={styles.carimage}
                  />
                  <Text
                    style={acc2 ? styles.containttext1 : styles.containttext}>
                    Package
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.newContainer}>
            {acc ? (
              <>
                <View>
                  <View
                    style={{
                      marginHorizontal: 10,
                    }}>
                    <Text style={styles.text}>Select pick up location</Text>
                    <View style={styles.picker}>
                      {/* <GooglePlacesAutocomplete
                        placeholder="Search"
                        onPress={(data, details = null) => {
                          // 'details' is provided when fetchDetails = true
                          console.log(data, details);
                        }}
                        query={{
                          key: 'AIzaSyACW1po0qU1jptIybBPGdFY-_MrycQPjfk',
                          language: 'en',
                        }}
                      /> */}

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
              </>
            ) : (
              <>
                {acc1 ? (
                  <>
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
                          <TouchableOpacity
                            onPress={() => setModalVisible(true)}>
                            <Text style={styles.dates}>
                              {date.toDateString()}
                            </Text>
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
                            <Text style={styles.dates}>
                              {time.toTimeString()}
                            </Text>
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
                  </>
                ) : (
                  <>
                    {acc2 ? (
                      <>
                        <View>
                          <View
                            style={{
                              marginHorizontal: 10,
                            }}>
                            <Text style={styles.text}>Select City</Text>
                            <View style={styles.picker}>
                              <Picker
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue, itemIndex) =>
                                  setSelectedLanguage(itemValue)
                                }
                                itemStyle={styles.pickerItem}>
                                <Picker.Item
                                  label="Bangalore"
                                  value="Bangalore"
                                />
                                <Picker.Item
                                  label="Bangalore"
                                  value="Bangalore"
                                />
                              </Picker>
                            </View>
                            <Text style={styles.text}>
                              Select pick up location
                            </Text>
                            <View style={styles.picker}>
                              <Picker
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue, itemIndex) =>
                                  setSelectedLanguage(itemValue)
                                }
                                itemStyle={styles.pickerItem}>
                                <Picker.Item
                                  label="Bangalore"
                                  value="Bangalore"
                                />
                                <Picker.Item
                                  label="Bangalore"
                                  value="Bangalore"
                                />
                              </Picker>
                            </View>

                            {/* <Text style={styles.text}>
                              Select Drop up location
                            </Text>
                            <View style={styles.picker}>
                              <Picker
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue, itemIndex) =>
                                  setSelectedLanguage(itemValue)
                                }
                                itemStyle={styles.pickerItem}>
                                <Picker.Item
                                  label="Bangalore"
                                  value="Bangalore"
                                />
                                <Picker.Item
                                  label="Bangalore"
                                  value="Bangalore"
                                />
                              </Picker>
                            </View> */}
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
                              <TouchableOpacity
                                onPress={() => setModalVisible(true)}>
                                <Text style={styles.dates}>
                                  {date.toDateString()}
                                </Text>
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
                                <Text style={styles.dates}>
                                  {time.toTimeString()}
                                </Text>
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
                              onPress={handlePressPackage}></AnimatedButton>
                          </View>
                        </View>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  local: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 50,
  },
  carimage: {
    height: 25,
    width: 35,
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
    borderRadius: 10,
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
