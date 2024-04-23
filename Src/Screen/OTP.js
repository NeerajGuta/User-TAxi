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
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const CELL_COUNT = 6;

const OTP = ({navigation}) => {
  const handlePress = () => {
    navigation.navigate('OTP');
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setdata] = useState(false);
  const toggleModal = () => {
    setdata(true);
    setModalVisible(!isModalVisible);
  };

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const uri = require('../Constant/animation.json');

  setTimeout(() => {}, 3000);

  // useEffect(() => {
  //   if (data === true) {
  //     setInterval(() => {
  //       navigation.navigate('Home');
  //     }, 2000);
  //   }
  // }, [data]);
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
              Please enter the code we just sent to phone ********85 !
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
            onPress={() => {
              // toggleModal();
              navigation.navigate('Home');
            }}
          />
        </View>
      </View>
      {/* Modal */}
      <View style={styles.modal}>
        <Modal isVisible={isModalVisible}>
          <View style={styles.congrats}>
            <AntDesign
              name="arrowleft"
              size={20}
              style={{paddingLeft: 10}}
              onPress={toggleModal}
            />
            <LottieView
              source={uri}
              autoPlay
              loop
              style={{width: 160, height: 160, alignSelf: 'center'}}
            />
            <View style={styles.containers}>
              <Text style={styles.welcome}>Congratulations</Text>
              <Text style={styles.containt}>
                Your phone no verify,Acccount is ready to use, you will be
                redirected to the Home Screen in a few second
              </Text>
            </View>

            {/* <AnimatedButton title="Hide modal" onPress={toggleModal} /> */}
          </View>
        </Modal>
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
