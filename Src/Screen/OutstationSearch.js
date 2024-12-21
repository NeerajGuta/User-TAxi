import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import Color from '../Constant/Color';
import AnimatedButton from '../Constant/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../Constant/Color';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import polyline from '@mapbox/polyline';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import axios from 'axios';

const OutstationSearch = ({navigation, route}) => {
  const {pickupLocation, dropLocation, date, time, returndate, selectedValue} =
    route.params;
  console.log(pickupLocation.data.description, 'getlocationpickupLocation');
  console.log(dropLocation.data.description, 'getlocationdropLocation');
  console.log(date, 'date');
  console.log(time, 'time');
  console.log(returndate, 'returndate');
  console.log(selectedValue, 'selectedValue');

  const mapRef = useRef();

  const [pickupLangi, setpickuplangi] = useState('');
  const [dropLangi, setdroplangi] = useState('');

  const [pickupdistance, setpickupdistance] = useState();
  const [pickuptime, setpickuptime] = useState();
  const [cabdata, setCabdata] = useState({});

  const [pickupLocationdata, setpickupLocationdata] = useState('');
  const [dropLocationdata, setdropLocationdata] = useState('');
  // console.log(
  //   pickupLangi.latitude,
  //   pickupLangi.longitude,
  //   dropLangi.latitude,
  //   dropLangi.latitude,
  //   'pickupLangia[epf[es[flew[fdlc[ewskldf[vkeds[k',
  // );
  const [acc, setAcc] = useState(true);

  // ref
  const bottomSheetModalRef = useRef();

  // variables
  const snapPoints = useMemo(() => ['23%', '80%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const [accview, setAccview] = useState('');

  const handleNavigation = () => {
    navigation.navigate('Confirmlocation', {
      totalCost,
      pickupLocationdata,
      pickupLangi,
      dropLocationdata,
      pickupdistance,
    });
  };

  const YOUR_GOOGLE_API_KEY = 'AIzaSyACW1po0qU1jptIybBPGdFY-_MrycQPjfk';

  const getAutocompleteSuggestions = async input => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input,
    )}&key=${YOUR_GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.predictions;
  };

  // placeid
  const getPlaceDetails = async placeId => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${YOUR_GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK') {
      const location = data.result.geometry.location;
      return {latitude: location.lat, longitude: location.lng};
    } else {
      throw new Error(data.status);
    }
  };

  const getDirections = async (startLoc, destinationLoc) => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${destinationLoc.latitude},${destinationLoc.longitude}&key=${YOUR_GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK') {
      const points = polyline.decode(data.routes[0].overview_polyline.points);
      const coords = points.map(point => ({
        latitude: point[0],
        longitude: point[1],
      }));
      return coords;
    } else {
      throw new Error(data.status);
    }
  };

  const getDistanceAndDuration = async (origin, destination) => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin,
    )}&destinations=${encodeURIComponent(
      destination,
    )}&key=${YOUR_GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.rows[0].elements[0].status === 'OK') {
      const distance = data.rows[0].elements[0].distance.text;
      const duration = data.rows[0].elements[0].duration.text;
      return {distance, duration};
    } else {
      throw new Error(data.rows[0].elements[0].status);
    }
  };

  const main = async () => {
    try {
      const pickup = `${pickupLocation?.data?.description}`;
      setpickupLocationdata(pickup);
      const dropoff = `${dropLocation?.data?.description}`;
      setdropLocationdata(dropoff);
      const pickupSuggestions = await getAutocompleteSuggestions(pickup);
      console.log('Pickup Suggestions:', pickupSuggestions);
      const pickupPlaceId = pickupSuggestions[0].place_id;

      const dropoffSuggestions = await getAutocompleteSuggestions(dropoff);
      console.log('Dropoff Suggestions:', dropoffSuggestions);
      const dropoffPlaceId = dropoffSuggestions[0].place_id;

      // Get latitude and longitude for pickup and dropoff
      const pickupLocation1 = await getPlaceDetails(pickupPlaceId);
      setpickuplangi(pickupLocation1);
      // console.log('Pickup Location:', pickupLocation1);

      const dropoffLocation1 = await getPlaceDetails(dropoffPlaceId);
      setdroplangi(dropoffLocation1);
      // console.log('Dropoff Location:', dropoffLocation1);

      // Get distance and duration
      const {distance, duration} = await getDistanceAndDuration(
        pickup,
        dropoff,
      );
      setpickupdistance(distance);
      setpickuptime(duration);
      console.log(`Distance between pickup and dropoff: ${distance}`);
      console.log(`Duration between pickup and dropoff: ${duration}`);

      const directionsCoordinates = await getDirections(
        pickupLocation1,
        dropoffLocation1,
      );
      setPolylineCoordinates(directionsCoordinates);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    main();
  }, []);

  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');

  const getGeocodingData = async (latitude, longitude, setAddress) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${{
          YOUR_GOOGLE_API_KEY,
        }}`,
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

  const [region, setRegion] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);

  useEffect(() => {
    if (
      pickupLangi.latitude &&
      pickupLangi.longitude &&
      dropLangi.latitude &&
      dropLangi.longitude
    ) {
      const midLatitude =
        (parseFloat(pickupLangi.latitude) + parseFloat(dropLangi.latitude)) / 2;
      const midLongitude =
        (parseFloat(pickupLangi.longitude) + parseFloat(dropLangi.longitude)) /
        2;

      const latDelta =
        Math.abs(
          parseFloat(pickupLangi.latitude) - parseFloat(dropLangi.latitude),
        ) * 2;
      const longDelta =
        Math.abs(
          parseFloat(pickupLangi.longitude) - parseFloat(dropLangi.longitude),
        ) * 2;

      const newRegion = {
        latitude: midLatitude,
        longitude: midLongitude,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
      };

      setRegion(newRegion);

      // Animate to new region
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000); // duration is in milliseconds
      }

      // Setting coordinates for polyline
      const coordinates = [
        {
          latitude: parseFloat(pickupLangi.latitude),
          longitude: parseFloat(pickupLangi.longitude),
        },
        {
          latitude: parseFloat(dropLangi.latitude),
          longitude: parseFloat(dropLangi.longitude),
        },
      ];
      setPolylineCoordinates(coordinates);

      // Get addresses
      getGeocodingData(
        pickupLangi.latitude,
        pickupLangi.longitude,
        setPickupAddress,
      );
      getGeocodingData(dropLangi.latitude, dropLangi.longitude, setDropAddress);
    }
  }, [
    pickupLangi.latitude,
    pickupLangi.longitude,
    dropLangi.latitude,
    dropLangi.longitude,
  ]);

  const [data, setData] = useState([]);
  const getOustationCab = async () => {
    try {
      let res = await axios.get(
        'http://192.168.1.19:8051/api/v1/admin/getoutstationstationrate',
      );
      if (res.status === 200) {
        setData(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOustationCab();
  }, []);

  const totalCost =
    parseFloat(cabdata?.perkmfare) * parseInt(pickupdistance) +
    cabdata?.bookingfee +
    cabdata?.cancellationcharge +
    cabdata?.servicecharge +
    cabdata?.onewaydriverallowance +
    cabdata?.onewaynightwayallowance +
    cabdata?.tollcharge +
    cabdata?.parkingcharge;

  const totalCostRound =
    parseFloat(cabdata?.perkmfare) * (2 * parseInt(pickupdistance)) +
    cabdata?.roundtripdriverallowance +
    cabdata?.roundtripnightwayallowance +
    cabdata?.bookingfee +
    cabdata?.cancellationcharge +
    cabdata?.servicecharge +
    cabdata?.tollcharge +
    cabdata?.parkingcharge;

  // console.log('item', totalCost);

  const filterCab = item => item?.triptype === selectedValue;

  return (
    <GestureHandlerRootView
      style={{flex: 1, backgroundColor: Color.backgroundColor}}>
      <View style={{flex: 1, backgroundColor: Color.backgroundColor}}>
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
        {/* Ensure the image takes up available space */}
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
          height={responsiveScreenHeight(45)}
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
              description={pickupAddress}>
              <Image source={require('../Assets/pin_icon.png')} />
            </Marker>
          )}

          {dropLangi.latitude && dropLangi.latitude && (
            <Marker
              coordinate={{
                latitude: parseFloat(dropLangi.latitude),
                longitude: parseFloat(dropLangi.longitude),
              }}
              title="Drop-off Location"
              description={dropAddress}>
              <Image source={require('../Assets/pin_icon_dest.png')} />
            </Marker>
          )}
          {polylineCoordinates.length > 0 && (
            <Polyline
              coordinates={polylineCoordinates}
              strokeColor="#000000" // Set the color of the polyline
              strokeWidth={3} // Set the width of the polyline
            />
          )}
        </MapView>

        {/* <ImageBackground
            source={require('../Assets/map.png')}
            style={{width: undefined, height: 200}}
            resizeMode="cover">
            <View
              style={{
                width: 35,
                backgroundColor: Color.backgroundColor,
                padding: 7,
                borderRadius: 60,
                top: 10,
                marginLeft: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.goBack('')}>
                <Feather name="arrow-left" size={20} color={Color.black} />
              </TouchableOpacity>
            </View>
          </ImageBackground> */}

        <View style={styles.containent}>
          <View>
            <FontAwesome5
              name="walking"
              size={20}
              style={styles.icons}
              color="green"
            />
            <View style={styles.input}>
              <TextInput
                placeholder={`${pickupLocation?.data?.description}`}
                placeholderTextColor={Color.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: Color.grey,
            }}>
            <Entypo
              name="dot-single"
              size={20}
              style={styles.icons}
              color="red"
            />
            <View style={styles.input}>
              <TextInput
                placeholder={`${dropLocation?.data?.description}`}
                placeholderTextColor={Color.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: '600',
              paddingLeft: 10,
            }}>
            Recommended for you
          </Text>
          <FlatList
            data={data.filter(filterCab)}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  handlePresentModalPress();
                  setCabdata(item);
                }}>
                {item.triptype === 'Oneway' ? (
                  <>
                    <Animated.View
                      style={acc ? styles.sedanmini : styles.sedan}>
                      <Image
                        style={styles.image}
                        src={`http://192.168.1.19:8051/Localstation/${item?.vehicleImage}`}
                        resizeMode="cover"
                      />
                      <View>
                        <Text style={styles.mean}>{item?.vehicleType}</Text>
                        {/* <Text style={{color: 'green'}}>{pickupdistance}</Text> */}
                      </View>
                      <View>
                        <Text style={styles.mean}>
                          ₹
                          {parseFloat(item?.perkmfare) *
                            parseInt(pickupdistance) +
                            item?.bookingfee +
                            item?.onewaydriverallowance +
                            item?.onewaynightwayallowance +
                            item.cancellationcharge +
                            item?.parkingcharge +
                            item?.tollcharge +
                            item.servicecharge}
                        </Text>
                        {/* <Text style={{color: 'red'}}>{pickuptime}</Text> */}
                      </View>
                    </Animated.View>
                  </>
                ) : (
                  <>
                    <Animated.View
                      style={acc ? styles.sedanmini : styles.sedan}>
                      <Image
                        style={styles.image}
                        src={`http://192.168.1.19:8051/Localstation/${item?.vehicleImage}`}
                        resizeMode="cover"
                      />
                      <View>
                        <Text style={styles.mean}>{item?.vehicleType}</Text>
                        {/* <Text style={{color: 'green'}}>{pickupdistance}</Text> */}
                      </View>
                      <View>
                        <Text style={styles.mean}>
                          ₹{' '}
                          {parseFloat(item?.perkmfare) *
                            (2 * parseInt(pickupdistance)) +
                            item?.bookingfee +
                            item?.cancellationcharge +
                            item?.servicecharge +
                            item?.tollcharge +
                            item?.parkingcharge +
                            item?.roundtripdriverallowance +
                            item?.roundtripnightwayallowance}
                        </Text>
                        {/* <Text style={{color: 'red'}}>{pickuptime}</Text> */}
                      </View>
                    </Animated.View>
                  </>
                )}
              </TouchableOpacity>
            )}
            // keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>

      <BottomSheetModalProvider>
        <View style={styles.container}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <BottomSheetView style={styles.contentContainer}>
              <View style={styles.congrats}>
                <View style={styles.comback}>
                  <View style={{width: 210}}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '600',
                        color: Color.black,
                      }}>
                      {cabdata?.vehicleType}
                    </Text>
                    <Text style={{textAlign: 'justify'}}>
                      A regular comfortable {cabdata?.vehicleType} that becomes
                      your everyday ride.
                    </Text>
                  </View>
                  <Image
                    src={`http://192.168.1.19:8051/Localstation/${cabdata?.vehicleImage}`}
                    style={{width: 90, height: 50}}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.comback}>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image
                      src={`http://192.168.1.19:8051/Localstation/${cabdata?.vehicleImage}`}
                      style={{width: '100%', height: 30}}
                      resizeMode="cover"
                    />
                    <Text style={{paddingVertical: 10}}>Comfy Hatch</Text>
                  </View>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image
                      source={require('../Assets/money.png')}
                      style={{width: 30, height: 30}}
                      resizeMode="cover"
                    />
                    <Text style={{paddingVertical: 10}}>Pocket Friendly</Text>
                  </View>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image
                      source={require('../Assets/no-money.png')}
                      style={{width: 30, height: 30}}
                      resizeMode="cover"
                    />
                    <Text style={{paddingVertical: 10}}>Cashless Rides</Text>
                  </View>
                </View>
                <View style={styles.cabbook}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={styles.mean}>Total fare</Text>
                    </View>
                    <Text style={styles.mean}>
                      ₹{' '}
                      {selectedValue === 'Oneway' ? totalCost : totalCostRound}
                    </Text>
                  </View>
                  <Text style={{color: 'red'}}>Includes Others allowance</Text>
                  <View style={styles.textcontent}>
                    <Text style={styles.outstationrstae}>PerKm Fare</Text>
                    <Text>₹{cabdata?.perkmfare}</Text>
                  </View>
                  {cabdata?.triptype === 'Oneway' ? (
                    <>
                      <View style={styles.textcontent}>
                        <Text style={styles.outstationrstae}>
                          Onewaydriverallowance
                        </Text>
                        <Text>₹{cabdata?.onewaydriverallowance}</Text>
                      </View>
                      <View style={styles.textcontent}>
                        <Text style={styles.outstationrstae}>
                          Onewaynightwayallowance
                        </Text>
                        <Text>₹{cabdata?.onewaynightwayallowance}</Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.textcontent}>
                        <Text style={styles.outstationrstae}>
                          Roundtripdriverallowance
                        </Text>
                        <Text>₹{cabdata?.roundtripdriverallowance}</Text>
                      </View>
                      <View style={styles.textcontent}>
                        <Text style={styles.outstationrstae}>
                          Roundtripnightwayallowance
                        </Text>
                        <Text>₹{cabdata?.roundtripnightwayallowance}</Text>
                      </View>
                    </>
                  )}

                  <View style={styles.textcontent}>
                    <Text style={styles.outstationrstae}>
                      Cancellation Charge
                    </Text>
                    <Text>Free</Text>
                  </View>
                  <View style={styles.textcontent}>
                    <Text style={styles.outstationrstae}>Total Seat</Text>
                    <Text>{cabdata?.totalseat}</Text>
                  </View>
                  <View style={styles.textcontent}>
                    <Text style={styles.outstationrstae}>Parking Charge</Text>
                    <Text>₹{cabdata?.parkingcharge}</Text>
                  </View>
                  <View style={styles.textcontent}>
                    <Text style={styles.outstationrstae}>Toll Charge</Text>
                    <Text>₹{cabdata?.tollcharge}</Text>
                  </View>
                  <View style={styles.textcontent}>
                    <Text style={styles.outstationrstae}>AC/Non-AC</Text>
                    <Text style={{color: 'red'}}>{cabdata?.ac}</Text>
                  </View>
                </View>
                <View style={styles.bookButton}>
                  <AnimatedButton
                    title="Book now"
                    style={{
                      marginTop: 18,
                      marginBottom: 4,
                    }}
                    onPress={handleNavigation}
                  />
                </View>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default OutstationSearch;

const styles = StyleSheet.create({
  containent: {
    // flex: 0.05,
    // flexGrow: 1,
    // flexShrink: 1,
    borderBottomWidth: 1,
    borderColor: Color.grey,
    backgroundColor: Color.backgroundColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: responsiveScreenWidth(100),
    height: responsiveHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 25,
  },
  icons: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  section: {
    // paddingLeft: 10,
    paddingVertical: 5,
    flex: 1,
  },
  sedan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  mean: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.black,
  },
  sedanmini: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 30,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: Color.backgroundColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#dbd3d340',
    borderRadius: 5,
  },
  image: {
    height: '120%',
    width: 60,
  },
  bookButton: {
    alignSelf: 'center',
  },
  congrats: {
    // minHeight: 400,
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: Color.backgroundColor,
    paddingVertical: 20,
  },
  comback: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  cabbook: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginHorizontal: 15,
    borderRadius: 10,
    borderColor: Color.grey,
    padding: 20,
    borderTopWidth: 1,
    width: responsiveScreenWidth(100),
  },
  container: {
    // flex: 1,
    // padding: 24,
    justifyContent: 'center',
    // backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  outstationrstae: {
    fontSize: 15,
    fontWeight: '500',
  },
  textcontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
});
