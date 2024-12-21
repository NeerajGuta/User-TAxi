import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './Src/Navigation/Navigation';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
const App = () => {
  // Define the background message handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // You can perform any background task here, such as updating local storage or showing a notification
  });
  useEffect(() => {
    const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived (foreground):', remoteMessage);
      // Handle foreground messages here (e.g., show a notification)
      // Example: Alert the user with the notification details
      if (remoteMessage.notification) {
        Alert.alert(
          remoteMessage.notification.title || 'Notification',
          remoteMessage.notification.body || 'New message!',
        );
      }
    });

    return () => {
      unsubscribeMessage();
    };
  }, []);

  return (
    <>
      <Navigation />
      <FlashMessage position="top" />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
