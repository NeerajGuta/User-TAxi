import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../Constant/Color';
import AnimatedButton from '../Constant/Button';
import Color from '../Constant/Color';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import {check, request, RESULTS} from 'react-native-permissions';
const API_KEY = "511ee4a684a7432389e220e510e77a73";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';

const Home = ({navigation, route}) => {
  const mapRef = useRef();

  const handlePress = () => {
    navigation.navigate('Local');
  };
  const handleOutstation = () => {
    navigation.navigate('Outstation');
  };
  const handlePackages = () => {
    navigation.navigate('Package');
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
  const [position, setposition] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Location Permission

  useEffect(() => {
    const checkLocationServices = async () => {
      const permission = await check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (permission === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
          },
          error => {
            console.log(error); // Log the error to see the error code
            if (error.code === 1) {
              // PERMISSION_DENIED
              requestLocationPermission();
            } else if (error.code === 2 || error.code === 3) {
              // POSITION_UNAVAILABLE or TIMEOUT
              showAlert('Location services are disabled. Please enable them.');
            }
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else if (permission === RESULTS.DENIED) {
        requestLocationPermission();
      } else if (permission === RESULTS.BLOCKED) {
        showAlert(
          'Location permission is blocked. Please enable it in settings.',
        );
      }
    };

    if (!locationPermissionRequested) {
      checkLocationServices();
    }
  }, [locationPermissionRequested]);

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
        setLocationPermissionRequested(true);
        checkLocationServices();
        console.log('Location permission granted');
      } else {
        showAlert('Location permission denied. Please enable it in settings.');
        console.log('Location permission denied');
      }

      setLocationPermissionRequested(true);
    } catch (error) {
      console.log('Location permission request error:', error);
    }
  };

  const showAlert = message => {
    Alert.alert(
      'Location Services Alert',
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

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
  // console.log(address);
  const getGeocodingData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCom4BCfTVsw3o22AYg69Y7EovmLfV_Alw`,
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

  const [drivercab, setDrivercab] = useState([]);
  // console.log(drivercab?.lat, 'drivercab');
  const getallDriver = async () => {
    let res = await axios.get(
      'http://192.168.1.19:8051/api/v1/driver/getdriver',
    );
    if (res.status === 200) {
      setDrivercab(res.data.success);
    }
  };
  useEffect(() => {
    getallDriver();
  }, []);

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  // Function to filter drivers within 5 kilometers of current location
  const filterDriversWithin5Kms = () => {
    if (lati && longi) {
      return drivercab.filter(driver => {
        const driverLocation = {
          latitude: parseFloat(driver.lat),
          longitude: parseFloat(driver.long),
        };
        const userLocation = {
          latitude: parseFloat(lati),
          longitude: parseFloat(longi),
        };
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          driverLocation.latitude,
          driverLocation.longitude,
        );
        return distance <= 1; // 5 kilometers
      });
    }
    return [];
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View>
            <MapView
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
              height={responsiveScreenHeight(65)}
              width={responsiveScreenWidth(100)}
              pitchEnabled={true}
              rotateEnabled={true}>
              {lati & longi ? (
                <>
                  <Marker
                    // description="delievry person"
                    coordinate={{
                      latitude: parseFloat(lati),
                      longitude: parseFloat(longi),
                    }}
                    description={address}
                    title="Current Location">
                    <Image source={require('../Assets/pin_icon_dest.png')} />
                  </Marker>
                </>
              ) : (
                <></>
              )}
              {filterDriversWithin5Kms()
                ?.filter(itemcab => itemcab.status === 'online')
                ?.map((driver, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parseFloat(driver.lat),
                      longitude: parseFloat(driver.long),
                    }}
                    // title={driver.name} // Use driver's name as the marker title
                  >
                    <Image
                      source={require('../Assets/Taxi-Right.png')}
                      style={{height: 35, width: 35}}
                    />
                  </Marker>
                ))}
            </MapView>
            {/* <Image
              source={require('../Assets/map.png')}
              style={{height: 280, width: 400}}
              resizeMode="cover"
            /> */}
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
                  // placeholder="Current location"
                  placeholder={address}
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
                    source={require('../Assets/local-icon.png')}
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
                    source={require('../Assets/Oustation-icon.png')}
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
                    source={require('../Assets/Oustation-icon.png')}
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
                <TouchableOpacity onPress={handlePress}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: COLORS.grey,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: COLORS.grey,
                      paddingHorizontal: 10,
                      height: responsiveHeight(7),
                    }}>
                    <Icon
                      name="search"
                      size={20}
                      color={COLORS.black}
                      style={styles.icon}
                    />
                    <Text style={styles.textInput}>Where are you going</Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {acc1 ? (
                  <>
                    <TouchableOpacity onPress={handleOutstation}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: COLORS.grey,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: COLORS.grey,
                          paddingHorizontal: 10,
                          height: responsiveHeight(7),
                        }}>
                        <Icon
                          name="search"
                          size={20}
                          color={COLORS.black}
                          style={styles.icon}
                        />
                        <Text style={styles.textInput}>
                          Where are you going
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    {acc2 ? (
                      <>
                        <TouchableOpacity onPress={handlePackages}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: COLORS.grey,
                              borderRadius: 5,
                              borderWidth: 1,
                              borderColor: COLORS.grey,
                              paddingHorizontal: 10,
                              height: responsiveHeight(7),
                            }}>
                            <Icon
                              name="search"
                              size={20}
                              color={COLORS.black}
                              style={styles.icon}
                            />
                            <Text style={styles.textInput}>
                              Where are you going
                            </Text>
                          </View>
                        </TouchableOpacity>
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
  textInput: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    paddingHorizontal: 15,
    color: COLORS.black,
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
    paddingBottom: 10,
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
