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
import React, {useState, useEffect} from 'react';
import Color from '../Constant/Color';
import Feather from 'react-native-vector-icons/Feather';
import AnimatedButton from '../Constant/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const BookNow = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.backgroundColor}}>
      <View style={styles.conainer}>
        <View>
          <ImageBackground
            source={require('../Assets/map.png')}
            style={{width: undefined, height: 451}}
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
          </ImageBackground>
        </View>
        <View style={styles.container1}>
          <View>
            <FontAwesome5
              name="walking"
              size={20}
              style={styles.icons}
              color="green"
            />
            <View style={styles.input}>
              <TextInput
                placeholder="Your current location "
                placeholderTextColor={Color.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>
          <View style={styles.bookride}>
            <View>
              <Text style={styles.mean}>OTP - 2490</Text>
              <Text style={styles.mean}>Vehicle No - KA20 BD 2394</Text>
            </View>
            <Text style={styles.mean}>Price - ₹674</Text>
          </View>
          <AnimatedButton
            title="Start ride"
            style={{
              marginTop: 10,
              marginBottom: 4,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookNow;

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
  },
  container1: {
    flex: 1,
    marginHorizontal: 20,
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
  icons: {
    position: 'absolute',
    top: 15,
    left: 10,
  },
  input: {
    width: '100%',
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: Color.grey,
  },
});
