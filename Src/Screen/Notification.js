import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../Constant/Color';
import axios from 'axios';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      user: 'John Doe',
      title: 'New Message',
      description: 'You have a new message from Alice.',
      time: '10:30 AM',
    },
    {
      id: 2,
      user: 'Alice Smith',
      title: 'Reminder',
      description: "Don't forget to submit your report by 3 PM.",
      time: 'Yesterday',
    },
  ];

  const [user, setUser] = useState('');
  const [walletdata, setWalletdata] = useState([]);
  const getNotification = async _id => {
    let res = await axios.get(
      'http://192.168.1.19:8051/api/v1/admin/getallusernotification',
    );
    if (res.status === 200) {
      setWalletdata(res.data.success);
    }
  };
  useEffect(() => {
    getNotification();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={walletdata}
        renderItem={({item}) => (
          <View style={styles.notificationContainer} key={item._id}>
            <View style={styles.contentContainer}>
              {/* <Text style={styles.title}>{item.text}</Text> */}
              <Text style={styles.description}>{item.text}</Text>
              {user.length < 1 ? (
                <></>
              ) : (
                <>
                  <View style={styles.infoContainer}>
                    <FontAwesome
                      name="user"
                      size={16}
                      color="gray"
                      style={styles.icon}
                    />
                    <Text style={styles.infoText}>{item.user}</Text>
                    <Text style={styles.infoText}> • {item.time}</Text>
                  </View>
                </>
              )}
            </View>
          </View>
        )}
        // keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  notificationContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Color.black,
  },
  description: {
    fontSize: 14,
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    marginRight: 5,
  },
  infoText: {
    fontSize: 12,
    color: 'gray',
  },
});

export default Notification;
