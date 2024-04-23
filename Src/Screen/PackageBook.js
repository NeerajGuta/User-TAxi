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
} from 'react-native';
import React, {useState} from 'react';
import Color from '../Constant/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedButton from '../Constant/Button';

const PackageBook = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <SafeAreaView styles={{flex: 1, backgroundColor: Color.backgroundColor}}>
      <StatusBar backgroundColor={Color.buttonColor} barStyle="light-content" />
      <View style={styles.conatiner}>
        <AntDesign
          name="arrowleft"
          size={20}
          style={{paddingLeft: 10}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{fontSize: 16, fontWeight: '600', color: Color.black}}>
          Traveller Details
        </Text>
      </View>
      <View style={styles.logins}>
        <View style={{marginBottom: 12}}>
          <View style={styles.input}>
            <TextInput
              placeholder="Enter your Name"
              placeholderTextColor={Color.black}
              keyboardType="email-address"
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
              keyboardType="email-address"
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
              keyboardType="email-address"
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
            }}>
            Booking Summary
          </Text>
          <View style={styles.cabbook}>
            <Text>Pickup Location: </Text>
            <Text style={{fontWeight: 'bold'}}>123 Main St</Text>
          </View>
          <View style={styles.cabbook}>
            <Text>Pickup Location: </Text>
            <Text style={{fontWeight: 'bold'}}>123 Main St</Text>
          </View>
          <View style={styles.cabbook}>
            <Text>Date: </Text>
            <Text style={{fontWeight: 'bold'}}>April 3, 2024</Text>
          </View>
          <View style={styles.cabbook}>
            <Text>Time: </Text>
            <Text style={{fontWeight: 'bold'}}>10:00 AM</Text>
          </View>
          <View style={styles.cabbook}>
            <Text>Total Fare: </Text>
            <Text style={{fontWeight: 'bold'}}>$30.00</Text>
          </View>
        </View>
        <AnimatedButton title="Continue" />
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
    backgroundColor: Color.buttonColor,
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
    marginTop: 10,
    borderTopLeftRadius: 120,
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
  },
});
