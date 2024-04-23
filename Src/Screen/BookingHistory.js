import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Color from '../Constant/Color';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

const BookingHistory = () => {
  const [rideHistory, setRideHistory] = useState([]);
  const initialRideHistory = [
    {
      id: 1,
      date: '2024-03-28',
      time: '07:29',
      pickupLocation: '123 Main St',
      dropoffLocation: '456 Elm St',
      fare: 15,
    },
    {
      id: 2,
      date: '2024-03-25',
      time: '10:29',
      pickupLocation: '789 Oak St',
      dropoffLocation: '101 Pine St',
      fare: 20,
    },
  ];

  useEffect(() => {
    fetchRideHistory();
  }, []);

  const fetchRideHistory = () => {
    setTimeout(() => {
      setRideHistory(initialRideHistory);
    }, 1000); // Simulated delay of 1 second
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 2,
        }}>
        <Text style={styles.text}>
          <EvilIcons name="location" size={18} color={Color.buttonColor} />
          Mile: {item.date}
        </Text>
        <Text style={styles.text}>
          <Feather name="watch" size={18} color={Color.buttonColor} /> 6 mins
        </Text>
        <Text style={styles.text}>Fare: ${item.fare}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 2,
        }}>
        <Text style={styles.text}>Date & Time</Text>
        <Text style={styles.text}>Mar 31,2024 | 02:00</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 2,
        }}>
        <Text style={styles.text}>Pickup Location</Text>
        <Text style={styles.text}>Singapura,Laxmi Layout</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 2,
        }}>
        <Text style={styles.text}>Drop Location</Text>
        <Text style={styles.text}>Singapura,Laxmi Layout</Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: Color.backgroundColor}}>
      <FlatList
        data={rideHistory}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: Color.backgroundColor,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  text: {
    // fontSize: 16,
    // color: Color.black,
    // fontWeight: '600',
  },
  text: {
    fontSize: 13,
    color: Color.black,
    // fontWeight: '600',
  },
});

export default BookingHistory;
