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

const Connectingdriver = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.backgroundColor}}>
      <View style={styles.conainer}>
        <View>
          <ImageBackground
            source={require('../Assets/map.png')}
            style={{width: undefined, height: 560}}
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
            <View style={styles.input}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 15,
                  color: 'black',
                  fontWeight: '600',
                }}>
                Connecting you to a driver
              </Text>
            </View>
          </View>

          <View style={{alignSelf: 'center', paddingVertical: 20}}>
            <Image
              source={require('../Assets/driverimage.png')}
              style={{height: 100, width: 100}}
            />
          </View>
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
  container1: {
    flex: 1,
    marginHorizontal: 20,
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
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: Color.grey,
  },
});
