import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../Constant/Color';

const Contact = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.buttonColor} barStyle="light-content" />
      <ScrollView>
        <View style={styles.container1}>
          <View style={styles.contact}>
            <FontAwesome5 name="phone-alt" size={22} style={styles.service} />
            <View>
              <Text style={styles.textfont}>Our 24x7 Customer Service</Text>
              <Text style={styles.textfont1}>+91 9473925485</Text>
            </View>
          </View>
          <View style={styles.contact}>
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              style={styles.service}
            />
            <View>
              <Text style={styles.textfont}>Write us at</Text>
              <Text style={styles.textfont1}>taxi@support.com</Text>
            </View>
          </View>
          <View style={styles.contact}>
            <FontAwesome6
              name="location-dot"
              size={22}
              style={styles.service}
            />
            <View>
              <Text style={styles.textfont}>Location</Text>
              <Text style={styles.textfont1}>
                Gangamaa Circle,Singapura,{'\n'}560058
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    backgroundColor: Color.buttonColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
  },
  service: {
    borderWidth: 1,
    height: 50,
    width: 50,
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 50,
    borderColor: 'white',
    backgroundColor: 'white',
    color: Color.black,
  },
  textfont: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Poppins-ExtraBoldItalic',
  },
  textfont1: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBoldItalic',
  },
});
