import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Animatable from 'react-native-animatable';
import AnimatedButton from '../Constant/Button';
import Color from '../Constant/Color';

const Onboarding = ({navigation}) => {
  const slides = [
    {
      key: 1,
      title: 'Get Started',
      text: 'Choose Your Comfort',
      text1: 'Enjoy a Luxurious Ride',
      image: require('../Assets/Onboarding1.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Get Started',
      text: 'Book a Ride  ',
      text1: 'Anywhere Anytime',
      image: require('../Assets/Onboarding1.png'),
      backgroundColor: '#59b2ab',
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.slideContainer}>
      <Animatable.Image
        // animation="slideInDown"
        // iterationCount="infinite"
        // direction="alternate"
        source={item.image}
        resizeMode="cover"
        style={styles.image}
      />

      <Text style={styles.travel}>{item.text}</Text>
      <Text style={styles.traveltext}>{item.text1}</Text>

      <AnimatedButton
        title={`${item.title}`}
        onPress={() => {
          navigation.navigate('LoginPhone');
        }}></AnimatedButton>
    </View>
  );
  const renderNextButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('LoginPhone')}>
      <Text style={styles.button}>Next</Text>
    </TouchableOpacity>
  );

  const renderSkipButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('LoginPhone')}>
      <Text style={styles.button}>Skip</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginPhone'}],
          });
        }}
        activeDotStyle={{backgroundColor: '#515151', width: 40}}
        dotStyle={{
          backgroundColor: '#ffffff',
          width: 40,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,

          elevation: 1,
        }}
        renderNextButton={renderNextButton}
        renderSkipButton={renderSkipButton}
        showSkipButton={true}
        showNextButton={true}
      />
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.backgroundColor,
  },
  image: {
    width: 270,
    height: 300,
  },
  title: {
    fontSize: 24,
    marginTop: 16,
  },
  travel: {
    fontSize: 23,
    marginTop: 20,
    fontWeight: '700',
    color: Color.textColor,
  },
  traveltext: {
    color: Color.textColor1,
    fontSize: 27,
    fontWeight: '700',
  },
  button: {
    backgroundColor: Color.buttonColor,
    paddingHorizontal: 25,
    paddingVertical: 12,
    color: Color.backgroundColor,
    borderRadius: 20,
  },
});
