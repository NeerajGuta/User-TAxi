import React, {useEffect, useState, useRef} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import COLORS from '../Constant/Color';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AnimatedButton from '../Constant/Button';
import Color from '../Constant/Color';
import Feather from 'react-native-vector-icons/Feather';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {RadioButton} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';

const Outstation = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedValue, setSelectedValue] = useState('Oneway');

  const [date, setDate] = useState(new Date());
  const [returndate, setreturnDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const handleDateChange = newDate => {
    setDate(newDate);
  };
  const handleDateReturnChange = newDate => {
    setreturnDate(newDate);
  };

  const handlePressPackage = () => {
    navigation.navigate('Package');
  };

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  // console.log('pickupLocation', pickupLocation);
  // console.log('dropLocation', dropLocation);
  const handlePress = () => {
    if (!pickupLocation || !dropLocation) {
      return showMessage({
        message: 'Please select both pickup and drop locations',
        type: 'danger',
      });
    } else
      navigation.navigate('OutstationSearch', {
        pickupLocation,
        dropLocation,
        date: moment(date)?.format('YYYY-MM-DD'),
        time: moment(time)?.format('HH:mm'),
        returndate: moment(returndate)?.format('YYYY-MM-DD'),
        selectedValue,
      });
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
        <View style={styles.radioGroup}>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="Oneway"
              status={selectedValue === 'Oneway' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('Oneway')}
              color="#007BFF"
            />
            <Text style={styles.radioLabel}>One Way</Text>
          </View>

          <View style={styles.radioButton}>
            <RadioButton.Android
              value="Roundtrip"
              status={selectedValue === 'Roundtrip' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('Roundtrip')}
              color="#007BFF"
            />
            <Text style={styles.radioLabel}>Round Trip</Text>
          </View>
        </View>
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginBottom: 5,
          }}>
          <View>
            <Text style={styles.text}>Pick up Date</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.dates}>
                {moment(date).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}>
              <View
                style={[
                  styles.centeredView,
                  {backgroundColor: Color?.backgroundColor},
                ]}>
                <View style={styles.modalView}>
                  <DatePicker
                    mode="date"
                    date={date}
                    onDateChange={handleDateChange}
                  />
                  <Button
                    title="Close"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            </Modal>
          </View>
          <View>
            <Text style={styles.text}>Pick up Time</Text>
            <TouchableOpacity onPress={showTimepicker}>
              <Text style={styles.dates}>{moment(time).format('LT')}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
        {selectedValue === 'Roundtrip' ? (
          <>
            <View>
              <Text style={styles.text}>Return Date</Text>
              <TouchableOpacity onPress={() => setModalVisible1(true)}>
                <Text style={[styles.dates, {textAlign: 'left'}]}>
                  {moment(returndate).format('YYYY-MM-DD')}
                </Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => {
                  setModalVisible1(false);
                }}>
                <View
                  style={[
                    styles.centeredView,
                    {backgroundColor: Color?.backgroundColor},
                  ]}>
                  <View style={styles.modalView}>
                    <DatePicker
                      mode="date"
                      date={returndate}
                      onDateChange={handleDateReturnChange}
                    />
                    <Button
                      title="Close"
                      onPress={() => setModalVisible1(false)}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <AnimatedButton title="Search" onPress={handlePress}></AnimatedButton>
      </View>
    </View>
  );
};

export default Outstation;

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

  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dates: {
    borderWidth: 1,
    borderColor: '#dbd3d340',
    backgroundColor: COLORS.grey,
    borderRadius: 8,
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
    height: responsiveHeight(8),
    padding: 18,
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
});
