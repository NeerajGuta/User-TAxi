import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from 'react-native';

import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import Color from '../Constant/Color';
import Feather from 'react-native-vector-icons/Feather';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import AnimatedButton from '../Constant/Button';
import axios from 'axios';

const Packagesdetails = ({navigation, route}) => {
  const {pickupLocation, packages, date, time} = route.params;
  console.log(
    'pickupLocation:',
    date,
    time,
    pickupLocation.data.description,
    'packages:',
    packages,
  );
  const [data, setData] = useState([]);
  const [packagesdata, setpackagesdata] = useState({});
  // console.log('data', data);
  const Packages = async () => {
    try {
      let res = await axios.get(
        'http://192.168.1.19:8051/api/v1/admin/getpackages',
      );
      if (res.status === 200) {
        setData(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Packages();
  }, []);

  const totalPrice =
    packagesdata?.perhrfare +
    packagesdata?.perkmfare +
    packagesdata?.onewaydriverallowance +
    packagesdata?.servicecharge +
    packagesdata?.bookingfee;
  // console.log(totalPrice, 'totalPrice');
  // ref
  const bottomSheetModalRef = useRef();

  // variables
  const snapPoints = useMemo(() => ['23%', '55%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleNavigation = () => {
    navigation.navigate('PackageBook', {
      totalPrice: totalPrice,
      pickupLocation,
      packages,
      date,
      time,
      packagesdata: packagesdata,
    });
  };
  const packagefilter = item => item.packagestype === packages;
  // console.log('packagefilter', packagefilter);
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <View>
          <View style={styles.packacont}>
            <TouchableOpacity onPress={() => navigation.goBack('')}>
              <Feather name="arrow-left" size={20} color={Color.black} />
            </TouchableOpacity>
            <Text style={styles.texts}>{packages} </Text>
          </View>
          <FlatList
            data={data.filter(packagefilter)}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  handlePresentModalPress();
                  setpackagesdata(item);
                }}>
                <Animated.View style={styles.sedanmini}>
                  <Image
                    style={styles.image}
                    source={require('../Assets/HatchBack.png')}
                    // src={`http://192.168.1.19:8051/Localstation/${item?.vehicleImage}`}
                    resizeMode="cover"
                  />
                  <View>
                    <Text style={styles.mean}>{item?.vehicletype}</Text>
                    {/* <Text style={{color: 'green'}}>{pickupdistance}</Text> */}
                  </View>
                  <View>
                    <Text style={styles.mean}>
                      ₹{' '}
                      {item?.perhrfare +
                        item?.perkmfare +
                        item?.onewaydriverallowance +
                        item?.servicecharge +
                        item?.bookingfee}
                    </Text>
                    {/* <Text style={{color: 'red'}}>{pickuptime}</Text> */}
                  </View>
                </Animated.View>
              </TouchableOpacity>
            )}
            // keyExtractor={item => item.id.toString()}
          />
        </View>

        <BottomSheetModalProvider>
          <View style={styles.container1}>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              <BottomSheetView style={styles.contentContainer}>
                <View style={styles.congrats}>
                  <View style={styles.cabbook}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={styles.mean}>Total Fare</Text>
                        {/* <Text style={{color: 'red'}}>{pickupdistance}</Text> */}
                      </View>
                      <Text style={styles.mean}>₹ {totalPrice}</Text>
                    </View>
                    <Text style={{color: 'red'}}>
                      Includes Others allowance
                    </Text>
                    <View style={styles.textcontent}>
                      <Text style={styles.outstationrstae}>PerKm Fare</Text>
                      <Text>₹ {packagesdata?.perkmfare}</Text>
                    </View>
                    <View style={styles.textcontent}>
                      <Text style={styles.outstationrstae}>Perhrs Fare</Text>
                      <Text>₹ {packagesdata?.perhrfare}</Text>
                    </View>
                    <View style={styles.textcontent}>
                      <Text style={styles.outstationrstae}>
                        Oneway Driver Allowance
                      </Text>
                      <Text>₹ {packagesdata?.onewaydriverallowance}</Text>
                    </View>
                    <View style={styles.textcontent}>
                      <Text style={styles.outstationrstae}>Total Seat</Text>
                      <Text>{packagesdata?.totalseat}</Text>
                    </View>
                    <View style={styles.textcontent}>
                      <Text style={styles.outstationrstae}>Booking Fare</Text>
                      <Text>₹ {packagesdata?.bookingfee}</Text>
                    </View>
                    <View style={styles.textcontent}>
                      <Text style={styles.outstationrstae}>Service charge</Text>
                      <Text>₹ {packagesdata?.servicecharge}</Text>
                    </View>
                    <View style={styles.textcontent}>
                      {/* <Text style={styles.outstationrstae}>
                        Cancellation Charge
                      </Text> */}
                      {/* <Text>₹{cabdata?.cancellationcharge}</Text> */}
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
    </SafeAreaView>
  );
};

export default Packagesdetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color?.backgroundColor,
  },
  packacont: {
    backgroundColor: Color.backgroundColor,
    paddingVertical: 15,
    paddingHorizontal: 5,
    flexDirection: 'row',
    gap: 20,
  },
  texts: {
    color: Color.black,
    fontSize: 16,
    fontWeight: '700',
  },
  image: {
    width: 90,
    height: 35,
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
  mean: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.black,
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
  cabbook: {
    borderRadius: 10,
    borderColor: Color.grey,
    padding: 20,
    borderTopWidth: 1,
    width: responsiveScreenWidth(100),
  },
});
