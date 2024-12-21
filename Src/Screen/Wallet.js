import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Color from '../Constant/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedButton from '../Constant/Button';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import RazorpayCheckout from 'react-native-razorpay';

const Wallet = () => {
  const [user, setUser] = useState('');
  const getUser = async () => {
    let user = await AsyncStorage.getItem('user');
    let currentuser = JSON.parse(user);
    setUser(currentuser);
  };

  const [walletdata, setWalletdata] = useState({});
  console.log(walletdata, 'df0jsd');
  console.log('user', user?._id);
  const getWallet = async _id => {
    let res = await axios.get(
      'http://192.168.1.19:8051/api/v1/user/getcustomerwallet/' + user?._id,
    );
    if (res.status === 200) {
      setWalletdata(res.data.success);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getWallet();
    }
  }, [user]);

  const [walletmoney, setwalletmoney] = useState();
  const addMoneyWallet = async () => {
    if (!walletmoney || isNaN(walletmoney)) {
      Alert.alert('Please enter a valid wallet amount');
      return;
    }

    const amountInPaise = parseInt(walletmoney, 10) * 100;

    const options = {
      description: 'Add money to wallet',
      image: 'https://your-logo-url.png',
      currency: 'INR',
      key: 'rzp_test_FAe0X6xLYXaXHe', // Replace with your Razorpay API Key
      amount: amountInPaise, // Amount in paise
      name: 'TAXIGO',
      prefill: {
        email: user?.email,
        contact: user?.phone,
        name: user?.name,
      },
      theme: {color: '#F37254'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        console.log(`Success: ${data.razorpay_payment_id}`);
        processPayment(data.razorpay_payment_id);
      })
      .catch(error => {
        console.error(`Error: ${error.code} | ${error.description}`);
        Alert.alert(`Error: ${error.description}`);
      });
  };

  const processPayment = async paymentId => {
    try {
      const config = {
        url: '/addcustomerwallet',
        method: 'post',
        baseURL: 'http://192.168.1.19:8051/api/v1/user',
        headers: {'Content-Type': 'application/json'},
        data: {
          userId: user?._id,
          amount: parseInt(walletmoney, 10),
          paymentId: paymentId,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        Alert.alert('Money added successfully');
        setwalletmoney('');
        getWallet();
        toggleModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ref
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.backgroundColor}}>
      <View style={styles.boxes}>
        <View style={styles.conatiner}>
          <View>
            <Text style={styles.text}>Wallet Balance</Text>
            {walletdata.amount >= 0 ? (
              <Text style={styles.text}>₹{walletdata.amount?.toFixed(2)}</Text>
            ) : (
              <Text style={styles.text}>₹ 00.00</Text>
            )}
          </View>
          <AntDesign name="wallet" size={30} color={Color.buttonColor} />
        </View>

        <AnimatedButton
          title="Add Wallet Money"
          onPress={() => {
            toggleModal();
          }}
        />
      </View>
      <ScrollView>
        {walletdata?.transactions?.reverse()?.map((elee, i) => {
          return (
            <View style={styles.containt}>
              <View>
                <Text style={styles.text1}>₹ {elee?.amount.toFixed(2)}</Text>
                <Text style={styles.blasnce}>
                  {moment(elee?.date).format('MMM Do YY')}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    fontSize: 14,
                    fontWeight: '600',
                    color: Color?.black,
                  }}>
                  ₹ {elee?.balanceAfterTransaction.toFixed(2)}
                </Text>
                <Text
                  style={[
                    styles.blasnce,
                    {color: elee.type === 'credit' ? 'green' : 'red'},
                  ]}>
                  {' '}
                  {elee?.type}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={{backgroundColor: 'white', height: responsiveHeight(25)}}>
          <View style={styles.input}>
            <TextInput
              placeholder="E.g 500"
              value={walletmoney}
              onChangeText={walletmoney => setwalletmoney(walletmoney)}
              placeholderTextColor={Color.black}
              keyboardType="number-pad"
            />
          </View>
          <AnimatedButton
            title="Add"
            onPress={() => {
              addMoneyWallet();
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxes: {
    // marginVertical: 10,
    // marginHorizontal: 25,
    backgroundColor: '#f2f2f2',
    minHeight: 200,
    padding: 25,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: Color.black,
    paddingVertical: 3,
  },
  containt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    marginHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    padding: 20,
    borderColor: Color.grey,
    borderRadius: 5,
  },
  text1: {
    fontSize: 15,
    color: Color.black,
    fontWeight: '500',
  },
  blasnce: {
    fontSize: 14,
    fontWeight: '600',
    color: Color?.buttonColor,
  },
  input: {
    width: '90%',
    borderColor: Color.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginTop: 10,
    alignSelf: 'center',
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
});
