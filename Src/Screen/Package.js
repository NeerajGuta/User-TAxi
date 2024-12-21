import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import COLORS from '../Constant/Color';
import AnimatedButton from '../Constant/Button';
import Feather from 'react-native-vector-icons/Feather';
import {showMessage} from 'react-native-flash-message';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import Color from '../Constant/Color';

const Package = ({navigation}) => {
  const [pickupLocation, setPickupLocation] = useState(null);
  // console.log('pickupLocation', pickupLocation);
  const [dropLocation, setDropLocation] = useState(null);

  const [packages, setpackages] = useState();

  const [data, setData] = useState([]);
  // console.log('data', data);
  const packagesType = async () => {
    try {
      let res = await axios.get(
        'http://192.168.1.19:8051/api/v1/admin/getpackagestype',
      );
      if (res.status === 200) {
        setData(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    packagesType();
  }, []);

  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const handleDateChange = newDate => {
    setDate(newDate);
  };
  const handleDateReturnChange = newDate => {
    setreturnDate(newDate);
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
  const handlePress = () => {
    navigation.navigate('Packagesdetails', {
      pickupLocation: pickupLocation,
      packages: packages,
      date: moment(date)?.format('YYYY-MM-DD'),
      time: moment(time)?.format('HH:mm'),
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
        <Text style={styles.text}>Pick up location</Text>
        <GooglePlacesAutocomplete
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
        />
        <Text style={styles.text}>Package Type</Text>
        <View style={styles.packagess}>
          <Picker
            selectedValue={packages}
            onValueChange={(itemValue, itemIndex) => setpackages(itemValue)}>
            <Picker.Item
              label="Select Packages Type"
              value="Select Packages Type"
            />
            {data.map(ele => {
              return (
                <Picker.Item
                  label={ele?.packagestype}
                  value={ele?.packagestype}
                />
              );
            })}
          </Picker>
        </View>

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
      </View>

      <View style={styles.buttonContainer}>
        <AnimatedButton title="Search" onPress={handlePress}></AnimatedButton>
      </View>
    </View>
  );
};

export default Package;

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
  packagess: {
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
