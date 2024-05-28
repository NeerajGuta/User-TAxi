import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './Src/Navigation/Navigation';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <>
      <Navigation />
      <FlashMessage position="top" />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
