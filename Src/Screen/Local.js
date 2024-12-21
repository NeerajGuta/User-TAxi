import React, {useState} from 'react';
// import {FlatList, TextInput} from 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native';
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

import axios from 'axios';

const Local = ({navigation}) => {
  const [pickupLocation, setPickupLocation] = useState(null);
  // console.log('pickupLocation', pickupLocation);
  const [dropLocation, setDropLocation] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const YOUR_GOOGLE_API_KEY = 'AIzaSyACW1po0qU1jptIybBPGdFY-_MrycQPjfk';

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [tolocation, settolocation] = useState('');
  const [latto, setLatto] = useState(null);
  const [lngto, setLngto] = useState(null);
  const API_KEY = '511ee4a684a7432389e220e510e77a73';
  const handleSearch1 = async inputValue => {
    if (!inputValue) return;
    // if (!selectedCity) return Alert.alert("Error", "Please select city!");

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      `${inputValue}`,
    )}&key=${API_KEY}&limit=5&countrycode=IN`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;

      const cityResults = results.filter(
        result =>
          result.components.village ||
          result.components.town ||
          result.components.city,
      );
      const formattedOptions = cityResults.map(result => ({
        label: result.formatted, // Label to display
        value: result.geometry, // Value containing coordinates
      }));

      setOptions(formattedOptions);
    } catch (error) {
      console.error('Error fetching geocode data:', error);
    }
  };

  // const debouncedSearch = debounce(handleSearch1, 500);

  const handleInputChange = text => {
    setInputValue(text);
    handleSearch1(text); // Fetch options on input change
  };
  const handleInputChange2 = text => {
    settolocation(text);
    handleSearch1(text); // Fetch options on input change
  };
  const handleSelect = item => {
    setSelectedLocation(item.label);
    setPickupLocation(item.label);
    setLat(item.value.lat);
    setLng(item.value.lng);
    setInputValue(item.label); // Set input value to the selected label
    setIsDropdownVisible(false); // Hide dropdown after selection
  };

  const [droploc, setdroploc] = useState(false);
  const handleSelect2 = item => {
    settolocation(item.label);
    setDropLocation(item?.label);
    setLatto(item.value.lat);
    setLngto(item.value.lng);

    setdroploc(false); // Hide dropdown after selection
  };

  const handlePress = () => {
    if (!selectedLocation || !dropLocation) {
      return showMessage({
        message: 'Please select both pickup and drop locations',
        type: 'danger',
      });
    } else
      navigation.navigate('SearchVehicle', {
        pickupLocation,
        dropLocation,
        lat,
        lng,
        latto,
        lngto,
        triptype: 'Local',
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack('')}>
          <Feather name="arrow-left" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.autocompleteContainer}>
        <Text style={styles.text}>Pick up location</Text>
        {/* <GooglePlacesAutocomplete
          placeholder="Search Pick up location"
          onPress={(data, details = null) => {
            setPickupLocation({data, details});
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
        /> */}
        <TextInput
          style={styles.textInput}
          placeholder="Search Pick up location"
          value={inputValue}
          onChangeText={handleInputChange}
          onFocus={() => setIsDropdownVisible(true)} // Show dropdown on focus
        />
        {isDropdownVisible && options.length > 0 && (
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            style={{maxHeight: 200, marginTop: 10}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                }}
                onPress={() => handleSelect(item)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <Text style={styles.text}>Drop up location</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Search Drop up location"
          value={tolocation}
          onChangeText={handleInputChange2}
          onFocus={() => setdroploc(true)} // Show dropdown on focus
        />
        {droploc && options.length > 0 && (
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            style={{maxHeight: 200, marginTop: 10}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                }}
                onPress={() => handleSelect2(item)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        {/* <GooglePlacesAutocomplete
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
        /> */}
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
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
