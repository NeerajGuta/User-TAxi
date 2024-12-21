import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splacescreen = ({navigation}) => {
  const getUser = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    if (!user) {
      setTimeout(() => {
        navigation.navigate('Onboarding');
      }, 3000);
      return;
    } else {
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);
      return;
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  // setTimeout(() => {
  //   navigation.navigate('Onboarding');
  // }, 3000);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
      <View style={styles.screens}>
        <Image source={require('../Assets/Taxi.logo.jpg')} style={styles.img} />
      </View>
    </SafeAreaView>
  );
};

export default Splacescreen;

const styles = StyleSheet.create({
  screens: {
    alignSelf: 'center',
  },
  img: {
    width: 150,
    height: 110,
  },
});
