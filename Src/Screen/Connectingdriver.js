import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Color from '../Constant/Color';
import Feather from 'react-native-vector-icons/Feather';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import AnimatedButton from '../Constant/Button';
import FastImage from 'react-native-fast-image';

const Connectingdriver = ({navigation, route}) => {
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
  } = route.params;

  const mapRef = useRef();
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // useEffect(() => {
  //   if (pickupLangi.latitude && pickupLangi.longitude) {
  //     setRegion({
  //       ...region,
  //       latitude: parseFloat(pickupLangi.latitude),
  //       longitude: parseFloat(pickupLangi.longitude),
  //     });
  //   }
  // }, [pickupLangi]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.backgroundColor}}>
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
          height={responsiveScreenHeight(60)}
          width={responsiveScreenWidth(100)}
          pitchEnabled={true}
          rotateEnabled={true}>
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
          {/* {polylineCoordinates.length > 0 && (
            <Polyline
              coordinates={polylineCoordinates}
              strokeColor="#000000" // Set the color of the polyline
              strokeWidth={3} // Set the width of the polyline
            />
          )} */}
        </MapView>
        <View style={styles.container1}>
          <View style={styles.input}>
            <Text
              style={{
                width: '100%',
                fontSize: 17,
                paddingHorizontal: 10,
                color: 'black',
                fontWeight: '600',
              }}>
              Connecting you to a driver
            </Text>

            <FastImage
              source={require('../Assets/loadings.gif')}
              style={{
                width: '100%',
                height: 100,
              }}
              resizeMode="cover"
            />
          </View>

          {/* <View style={{alignSelf: 'center', paddingVertical: 20}}>
            <Image
              source={require('../Assets/driverimage.png')}
              style={{height: 100, width: 100}}
            />
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Connectingdriver;

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
  },

  icons: {
    position: 'absolute',
    top: 15,
    left: 10,
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 10,
    // borderBottomWidth: 1,
    // borderColor: Color.grey,
  },
});
