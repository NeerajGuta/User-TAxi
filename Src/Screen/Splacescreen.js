import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Splacescreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('Onboarding');
  }, 3000);

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
