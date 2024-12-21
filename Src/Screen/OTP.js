import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../Constant/Color';
import AnimatedButton from '../Constant/Button';
import Feather from 'react-native-vector-icons/Feather';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CELL_COUNT = 6;

const OTP = ({navigation, route}) => {
  const {number} = route.params;
  // console.log(number, 'number');
  // let number = 9473925485;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const VerfiyOtp = async () => {
    try {
      if (!value)
        return showMessage({
          message: 'Please enter otp',
          type: 'danger',
        });
      const config = {
        url: '/api/v1/user/otpvarification',
        method: 'post',
        baseURL: 'http://192.168.1.19:8051',
        headers: {'content-type': 'application/json'},
        data: {
          phoneNumber: number,
          otp: value,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        await AsyncStorage.setItem('user', JSON.stringify(res.data.details));
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error, number);
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
          <TouchableOpacity onPress={() => navigation.goBack('')}>
            <Feather name="arrow-left" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View
          style={{marginVertical: 22, marginHorizontal: 22, paddingTop: 25}}>
          <Text style={styles.welcome}>Phone Verification ! 👋</Text>
        </View>

        <View style={styles.logins}>
          <SafeAreaView style={styles.root}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
                textAlign: 'center',
              }}>
              Please enter the code we just sent to phone {number} !
            </Text>

            <CodeField
              ref={ref}
              {...props}
              caretHidden={false}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete={Platform.select({
                android: 'sms-otp',
                default: 'one-time-code',
              })}
              testID="my-code-input"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </SafeAreaView>

          <AnimatedButton
            title="Verify"
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={VerfiyOtp}
            // onPress={() => navigation.navigate('Home')}
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
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 40},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: COLORS.black,
    textAlign: 'center',
    borderRadius: 10,
  },
  focusCell: {
    borderColor: '#000',
  },
  modal: {
    flex: 0.0000001,
  },
  containers: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  congrats: {
    height: 400,
    backgroundColor: COLORS.backgroundColor,
    borderRadius: 10,
    paddingVertical: 20,
  },
  containt: {fontSize: 16, color: COLORS.black, textAlign: 'center'},
});

export default OTP;
