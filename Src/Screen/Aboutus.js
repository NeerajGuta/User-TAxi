import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../Constant/Color';

const Aboutus = () => {
  return (
    <SafeAreaView styles={{flex: 1, backgroundColor: Color.backgroundColor}}>
      <StatusBar backgroundColor={Color.buttonColor} barStyle="light-content" />
      <View>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          Welcome to [Your Taxi App Name], your reliable companion for
          hassle-free transportation services. At [Your Taxi App Name], we are
          committed to providing you with safe, convenient, and affordable rides
          wherever you go.
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '800',
            color: 'black',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          Why Choose Us?
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          {' '}
          Safety First :
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          Your safety is our top priority. We meticulously screen all drivers
          and vehicles to ensure compliance with safety standards. Rest assured,
          you're in good hands with our trusted drivers.
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          {' '}
          Convenience Redefined :
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          Say goodbye to waiting in long queues or struggling to find a ride.
          With our user-friendly app, you can book a taxi with just a few taps
          and track your ride in real-time.
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          {' '}
          Affordable Pricing :
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          We believe in fair and transparent pricing. Enjoy competitive rates
          and no hidden charges, so you can ride without breaking the bank.
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          {' '}
          24/7 Availability :
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          Need a ride at any time of the day or night? We've got you covered.
          Our services are available round-the-clock to cater to your
          transportation needs.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Aboutus;

const styles = StyleSheet.create({});
