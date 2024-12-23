import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Color from '../Constant/Color';
import Feather from 'react-native-vector-icons/Feather';
import AnimatedButton from '../Constant/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Confirmlocation = ({navigation, route}) => {
  const [user, setUser] = useState('');
  const getUser = async () => {
    let user = await AsyncStorage.getItem('user');
    let currentuser = JSON.parse(user);
    setUser(currentuser);
  };

  useEffect(() => {
    getUser();
  }, []);

  const {
    totalCost,
    pickupLocationdata,
    pickupLangi,
    dropLocationdata,
    pickupdistance,
    cabdata,
    minutes,
    hour,
    pickupLocation,
    dropLocation,
    lat,
    lng,
    latto,
    lngto,
    routecordinat,
    triptype,
  } = route.params;
  console.log(
    'totalCost, pickupLangi, dropLangi,pickupdistance',
    totalCost,
    pickupLocationdata,
    pickupLangi,
    dropLocationdata,
    pickupdistance,
    cabdata,
    minutes,
    hour,
    pickupLocation,
    dropLocation,
    lat,
    lng,
    latto,
    lngto,
    routecordinat,
  );

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
  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lat2 || !lon1 || !lon2) return 20;
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
    if (lat && lng) {
      return drivercab.filter(driver => {
        const driverLocation = {
          latitude: parseFloat(driver?.location?.lat),
          longitude: parseFloat(driver?.location?.lng),
        };
        console.log('driverLocation', driverLocation);

        const userLocation = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
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

  useEffect(() => {
    getallDriver();
  }, []);

  const handleNavigation = () => {
    sendNotificationdriver();
  };

  const mapRef = useRef();
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // useEffect(() => {
  //   if (pickupLangi.latitude &&lng) {
  //     setRegion({
  //       ...region,
  //       latitude: parseFloat(pickupLangi.latitude),
  //       longitude: parseFloat(pickupLangi.longitude),
  //     });
  //   }
  // }, [pickupLangi]);

  const bookTaxi = async () => {
    try {
      const config = {
        url: '/postbooking',
        method: 'post',
        baseURL: 'http://192.168.1.19:8051/api/v1/user',
        headers: {'Content-Type': 'application/json'},
        data: {
          userId: user?._id,
          pickuplocation: {address: pickupLocation, lat, lng},
          droplocation: {address: dropLocation, lat: latto, lng: lngto},
          totalfare: totalCost,
          totalkm: pickupdistance,
          triptype: triptype,
          paymenttype: 'online',
          vehiclecat: cabdata?.vehicleType,
          extraKm: cabdata?.perkmfare,
          extraHours: cabdata?.perhrfare,
          discount: 0,
          tax: cabdata?.gst,
          servicecharge: cabdata?.servicecharge,
          bookingfee: cabdata?.bookingfee,
        },
      };
      let res = await axios(config);
      if (res.status == 201) {
        navigation.navigate('Connectingdriver', {
          totalCost,
          pickupLocationdata,
          pickupLangi,
          dropLocationdata,
          pickupdistance,
          cabdata,
          minutes,
          hour,
          pickupLocation,
          dropLocation,
          lat,
          lng,
          latto,
          lngto,
          routecordinat,
          triptype,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendNotificationdriver = async () => {
    bookTaxi();
    try {
      const config = {
        url: '/sendNotification',
        method: 'post',
        baseURL: 'http://192.168.1.19:8051/api/notifications',
        headers: {'Content-Type': 'application/json'},
        data: {
          customerId: user?._id,
          pickupLocation: pickupLocation,
          dropLocation: dropLocation,
          price: totalCost,
          distance: pickupdistance,
          triptype,
        },
      };

      let res = await axios(config);

      if (res.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.backgroundColor}}>
      <ScrollView>
        <View
          style={{
            position: 'absolute',
            top: 10,
            zIndex: 999,
            width: 35,
            backgroundColor: Color.backgroundColor,
            padding: 7,
            borderRadius: 60,
            marginLeft: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack('')}>
            <Feather name="arrow-left" size={20} color={Color.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.conainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={false}
            showsMyLocationButton={false}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            height={responsiveScreenHeight(68)}
            width={responsiveScreenWidth(100)}
            pitchEnabled={true}
            rotateEnabled={true}>
            {filterDriversWithin5Kms()?.map((driver, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(driver?.location?.lat),
                  longitude: parseFloat(driver?.location?.lng),
                }}
                // title={driver.name} // Use driver's name as the marker title
              >
                <Image
                  source={require('../Assets/carmap.png')}
                  style={{height: 35, width: 35}}
                />
              </Marker>
            ))}
            {routecordinat.length > 0 && (
              <Polyline
                coordinates={routecordinat}
                strokeColor="#000000" // Set the color of the polyline
                strokeWidth={3} // Set the width of the polyline
              />
            )}
            {latto && lngto && (
              <Marker
                coordinate={{
                  latitude: parseFloat(latto),
                  longitude: parseFloat(lngto),
                }}
                title="Drop-off Location"
                description={dropLocation}>
                <Image source={require('../Assets/pin_icon_dest.png')} />
              </Marker>
            )}
            {lat && lng && (
              <Marker
                coordinate={{
                  latitude: parseFloat(lat),
                  longitude: parseFloat(lng),
                }}
                title="Pickup Location"
                description={pickupLocation}>
                <Image source={require('../Assets/pin_icon.png')} />
              </Marker>
            )}
          </MapView>

          <View style={styles.container1}>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 3,
              }}>
              <Text>Pickup Date</Text>
              <Text>{date}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 3,
              }}>
              <Text>Pickup Time</Text>
              <Text>{time}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 3,
              }}>
              <Text>Return Date</Text>
              <Text>{returndate}</Text>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                alignItems: 'center',
              }}>
              <FontAwesome5
                name="walking"
                size={25}
                style={styles.icons}
                color="green"
              />
              <View style={styles.input}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 16,
                    color: Color.black,
                  }}>
                  {pickupLocation}
                </Text>
              </View>
            </View>

            <AnimatedButton
              title="Confirm Pickup"
              style={{
                marginTop: 10,
                marginBottom: 4,
              }}
              onPress={handleNavigation}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Confirmlocation;

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
  },
  container1: {
    flex: 1,
    marginHorizontal: 10,
  },
  bookride: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: Color.buttonColor,
    borderRadius: 8,
  },
  mean: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.black,
  },
  icons: {padding: 10},
  input: {
    width: '100%',
    // height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    borderColor: Color.grey,
  },
});
