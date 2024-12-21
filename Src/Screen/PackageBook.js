import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  //   CheckBox,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../Constant/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedButton from '../Constant/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PackageBook = ({navigation, route}) => {
  const [user, setUser] = useState('');
  console.log(user, 'user');
  const getUser = async () => {
    let user = await AsyncStorage.getItem('user');
    let currentuser = JSON.parse(user);
    setUser(currentuser);
  };

  useEffect(() => {
    getUser();
  }, []);

  const {totalPrice, pickupLocation, packages, date, time, packagesdata} =
    route.params;
  console.log(
    totalPrice,
    pickupLocation.data.description,
    packages,
    date,
    time,
    packagesdata.vehicletype,
    'totalPrice',
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [address, setaddress] = useState('');

  const bookPackages = async () => {
    if (!name || !email || !phone || !address) {
      return Alert.alert('Please fill all the field !!!');
    }
    try {
      const config = {
        url: '/api/v1/user/addbookingpackages',
        method: 'post',
        baseURL: 'http://192.168.1.19:8051',
        headers: {'content-type': 'application/json'},
        data: {
          userId: user?._id,
          name,
          email,
          mobileno: phone,
          address,
          triptype: packages,
          vehicletype: packagesdata.vehicletype,
          pickuplocation: pickupLocation.data.description,
          pickupdate: date,
          pickuptime: time,
          totalfare: totalPrice,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView styles={{flex: 1, backgroundColor: Color.backgroundColor}}>
      <View style={styles.conatiner}>
        <AntDesign
          name="arrowleft"
          size={20}
          color="black"
          style={{paddingLeft: 10}}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={styles.logins}>
        <View style={{marginBottom: 12}}>
          <View style={styles.input}>
            <TextInput
              placeholder="Enter your Name"
              placeholderTextColor={Color.black}
              keyboardType="text"
              value={name}
              onChangeText={name => setName(name)}
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 12}}>
          <View style={styles.input}>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={Color.black}
              keyboardType="email-address"
              value={email}
              onChangeText={email => setEmail(email)}
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 12}}>
          <View style={styles.input}>
            <TextInput
              placeholder="Enter your Mobile No"
              placeholderTextColor={Color.black}
              keyboardType="number"
              value={phone}
              onChangeText={phone => setphone(phone)}
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 12}}>
          <View style={styles.input}>
            <TextInput
              placeholder="Enter your address"
              placeholderTextColor={Color.black}
              keyboardType="text"
              value={address}
              onChangeText={address => setaddress(address)}
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container1}>
        <View style={{marginBottom: 20}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
              textAlign: 'center',
              color: Color?.black,
            }}>
            Booking Summary
          </Text>
          <View>
            <Text style={styles.textp}>Pickup Location: </Text>
            <Text style={{fontWeight: 'bold'}}>
              {pickupLocation.data.description}
            </Text>
          </View>
          <View style={styles.cabbook}>
            <Text style={styles.textp}>Trip Type: </Text>
            <Text style={{fontWeight: 'bold'}}>{packages}</Text>
          </View>
          <View style={styles.cabbook}>
            <Text style={styles.textp}>Vehicle Type: </Text>
            <Text style={{fontWeight: 'bold'}}>
              {packagesdata?.vehicletype}
            </Text>
          </View>
          <View style={styles.cabbook}>
            <Text style={styles.textp}>Pickup Date: </Text>
            <Text style={{fontWeight: 'bold'}}>{date}</Text>
          </View>
          <View style={styles.cabbook}>
            <Text style={styles.textp}>Time: </Text>
            <Text style={{fontWeight: 'bold'}}>{time}</Text>
          </View>
          <View style={styles.cabbook}>
            <Text style={styles.textp}>Total Fare: </Text>
            <Text style={{fontWeight: 'bold'}}>₹ {totalPrice?.toFixed(2)}</Text>
          </View>
        </View>
        <AnimatedButton title="Continue" onPress={bookPackages} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackageBook;

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: Color.backgroundColor,
    padding: 20,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: Color.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  logins: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Color.backgroundColor,
  },
  cabbook: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#dbd3d340',
    paddingVertical: 6,
  },
  container1: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Color.backgroundColor,
  },
  textp: {
    color: 'black',
    fontWeight: '600',
  },
});
