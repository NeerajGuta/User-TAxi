import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../Constant/Color';
import AnimatedButton from '../Constant/Button';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';

const LoginPhone = () => {
  const navigation = useNavigation();
  const [number, setNumber] = useState();
  const [fcmToken, setFcmToken] = useState('');
  useEffect(() => {
    // Get the FCM token
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token :', token);
      setFcmToken(token);
      // Save the token to your backend if necessary
    };

    getToken();

    // Listen for token refresh
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(newToken => {
      console.log('FCM Token refreshed:', newToken);
      setFcmToken(newToken); // Update token in state on refresh
    });
    return () => {
      unsubscribeTokenRefresh();
    };
  }, []);

  const Login = async () => {
    if (!number) {
      return showMessage({
        message: `Phone no required !!!`,
        type: 'danger',
      });
    }
    if (number.length !== 10) {
      return showMessage({
        message: 'Please enter 10 digits mobile no',
        type: 'danger',
      });
    }
    try {
      const config = {
        url: '/api/v1/user/otp',
        method: 'post',
        baseURL: 'http://192.168.1.19:8051',
        headers: {'Content-Type': 'application/json'},
        data: {phoneNumber: number, fcmToken: fcmToken},
      };
      const res = await axios(config);
      if (res.status === 200) {
        // console.log('OTP sent successfully:', res.data);
        showMessage({
          message: `OTP sent to your mobile number ${number}`,
          type: 'success',
        });
        navigation.navigate('OTP', {number});
      } else {
        showMessage({
          message: 'Failed to send OTP. Please try again.',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.buttonColor}}>
      <View style={{flex: 1}}>
        <View
          style={{
            width: 35,
            backgroundColor: COLORS.backgroundColor,
            padding: 7,
            borderRadius: 60,
            top: 10,
            marginLeft: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View
          style={{marginVertical: 22, marginHorizontal: 22, paddingTop: 25}}>
          <Text style={styles.welcome}>Verification phone number ! 👋</Text>
          <Text style={{fontSize: 16, color: COLORS.black}}>
            Hello again you have been missed!
          </Text>
        </View>

        <View style={styles.logins}>
          <View style={{marginBottom: 12}}>
            <Text style={{fontSize: 16, fontWeight: '400', marginVertical: 8}}>
              Phone No
            </Text>
            <Fontisto
              name="phone"
              size={20}
              style={styles.icons}
              color={COLORS.buttonColor}
            />
            <View style={styles.input}>
              <TextInput
                placeholder="Enter your phone no"
                placeholderTextColor={COLORS.black}
                keyboardType="phone-pad"
                style={{width: '100%'}}
                value={number}
                onChangeText={number => setNumber(number)}
              />
            </View>
          </View>

          <AnimatedButton
            title="Send OTP"
            style={{marginTop: 18, marginBottom: 4}}
            onPress={Login}
            // onPress={() => navigation.navigate('OTP')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  logins: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    paddingHorizontal: 20,
    paddingVertical: 50,
    marginTop: 50,
    borderTopLeftRadius: 120,
  },
  icons: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
  forget: {
    color: 'red',
    fontWeight: '600',
  },
});

export default LoginPhone;
