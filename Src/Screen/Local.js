import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import COLORS from '../Constant/Color';
import AnimatedButton from '../Constant/Button';
import Feather from 'react-native-vector-icons/Feather';
import {showMessage} from 'react-native-flash-message';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const Local = ({navigation}) => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);

  const handlePress = () => {
    if (!pickupLocation || !dropLocation) {
      return showMessage({
        message: 'Please select both pickup and drop locations',
        type: 'danger',
      });
    } else navigation.navigate('SearchVehicle', {pickupLocation, dropLocation});
  };

  const YOUR_GOOGLE_API_KEY = 'AIzaSyACW1po0qU1jptIybBPGdFY-_MrycQPjfk';
  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack('')}>
          <Feather name="arrow-left" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.autocompleteContainer}>
        <Text style={styles.text}>Pick up location</Text>
        <GooglePlacesAutocomplete
          placeholder="Search Pick up location"
          onPress={(data, details = null) => {
            setPickupLocation({data, details});
            // console.log(data, details);
          }}
          query={{
            key: YOUR_GOOGLE_API_KEY,
            language: 'en',
          }}
          fetchDetails={true}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
          listEmptyComponent={() => (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results were found</Text>
            </View>
          )}
          styles={{
            textInput: styles.textInput,
          }}
        />
        <Text style={styles.text}>Drop up location</Text>
        <GooglePlacesAutocomplete
          placeholder="Search Drop up location"
          onPress={(data, details = null) => {
            setDropLocation({data, details});
            // console.log(data, details);
          }}
          query={{
            key: YOUR_GOOGLE_API_KEY,
            language: 'en',
          }}
          fetchDetails={true}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
          listEmptyComponent={() => (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results were found</Text>
            </View>
          )}
          styles={{
            textInput: styles.textInput,
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <AnimatedButton title="Search" onPress={handlePress}></AnimatedButton>
      </View>
    </View>
  );
};

export default Local;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  backButtonContainer: {
    width: responsiveScreenWidth(35),
    backgroundColor: COLORS.backgroundColor,
    padding: 7,
    borderRadius: 60,
    marginVertical: 10,
  },
  autocompleteContainer: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 50,
    zIndex: 1,
    width: responsiveScreenWidth(97),
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
    paddingBottom: 10,
  },
  textInput: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    backgroundColor: COLORS.grey,
    color: COLORS.black,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 5,
    height: responsiveHeight(8),
    marginBottom: 10,
  },
  noResultsContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
