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
    pickupLangi,
    pickupLocationdata,
    dropLocationdata,
    pickupdistance,
  } = route.params;
  console.log(
    'totalCost, pickupLangi, dropLangi,pickupdistance',
    totalCost,
    pickupLangi,
    pickupLocationdata,
    dropLocationdata,
    pickupdistance,
  );
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
  useEffect(() => {
    if (pickupLangi.latitude && pickupLangi.longitude) {
      setRegion({
        ...region,
        latitude: parseFloat(pickupLangi.latitude),
        longitude: parseFloat(pickupLangi.longitude),
      });
    }
  }, [pickupLangi]);

  const sendNotificationdriver = async () => {
    try {
      const config = {
        url: '/sendNotification',
        method: 'post',
        baseURL: 'http://192.168.1.19:8051/api/notifications',
        headers: {'Content-Type': 'application/json'},
        data: {
          customerId: user?._id,
          pickupLocation: pickupLocationdata,
          dropLocation: dropLocationdata,
          price: totalCost,
          distance: pickupdistance,
        },
      };

      let res = await axios(config);

      if (res.status === 200) {
        navigation.navigate('Connectingdriver', {
          totalCost,
          pickupLangi,
          pickupLocationdata,
          dropLocationdata,
          pickupdistance,
        });
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
            {pickupLangi.latitude && pickupLangi.longitude && (
              <Marker
                coordinate={{
                  latitude: parseFloat(pickupLangi.latitude),
                  longitude: parseFloat(pickupLangi.longitude),
                }}
                title="Pickup Location"
                description={pickupLocationdata}>
                <Image source={require('../Assets/pin_icon.png')} />
              </Marker>
            )}

            {/* {polylineCoordinates.length > 0 && (
            <Polyline
              coordinates={polylineCoordinates}
              strokeColor="#000000" // Set the color of the polyline
              strokeWidth={3} // Set the width of the polyline
            />
          )} */}
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
                  {pickupLocationdata}
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
