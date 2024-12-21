import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../Constant/Color';
import AnimatedButton from '../Constant/Button';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const [profile, setProfile] = useState();
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response.assets) {
        setProfile(response.assets[0]);
      }
    });
  };

  const getUser = async () => {
    const currentUser = await AsyncStorage.getItem('user');
    const user = JSON.parse(currentUser);
    setUser(user);
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phoneNumber);
    setAddress(user?.address);
  };

  useEffect(() => {
    getUser();
  }, []);

  const updateProfile = async () => {
    const formData = new FormData();
    try {
      formData.append('userId', user?._id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phoneNumber', phone);
      formData.append('address', address);
      if (profile) {
        formData.append('profileimage', {
          name: profile.fileName,
          type: profile.type,
          uri:
            Platform.OS === 'ios'
              ? profile.uri.replace('file://', '')
              : profile.uri,
        });
      }

      const response = await fetch(
        'http://192.168.1.19:8051/api/v1/user/updateprofile',
        {
          method: 'PUT',
          headers: {'Content-Type': 'multipart/form-data'},
          body: formData,
        },
      );
      const jsonResponse = await response.json();
      await AsyncStorage.setItem('user', JSON.stringify(jsonResponse?.success));
      console.log('Profile Updated');
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.buttonColor}}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={{
              width: 35,
              backgroundColor: COLORS.backgroundColor,
              padding: 7,
              borderRadius: 60,
              top: 10,
              marginLeft: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack('')}>
              <Feather name="arrow-left" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>
          <View style={styles.profile}>
            <TouchableOpacity>
              {profile ? (
                <Image
                  source={{uri: profile.uri}}
                  style={styles.profileAvatar}
                />
              ) : (
                <Image
                  source={{
                    uri:
                      `http://192.168.1.19:8051/User/${user?.profileimage}` ||
                      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                  }}
                  style={styles.profileAvatar}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <View style={styles.profileAction}>
                <FeatherIcon color="#fff" name="edit-3" size={15} />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileAddress}>{user?.address}</Text>
            </View>
          </View>

          <View style={styles.logins}>
            <View style={{marginBottom: 12}}>
              <Text
                style={{fontSize: 16, fontWeight: '400', marginVertical: 8}}>
                Name
              </Text>
              <Feather
                name="user"
                size={20}
                style={styles.icons}
                color={COLORS.buttonColor}
              />
              <View style={styles.input}>
                <TextInput
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={COLORS.black}
                  style={{width: '100%'}}
                />
              </View>
            </View>
            <View style={{marginBottom: 12}}>
              <Text
                style={{fontSize: 16, fontWeight: '400', marginVertical: 8}}>
                Email address
              </Text>
              <Fontisto
                name="email"
                size={20}
                style={styles.icons}
                color={COLORS.buttonColor}
              />
              <View style={styles.input}>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor={COLORS.black}
                  keyboardType="email-address"
                  style={{width: '100%'}}
                />
              </View>
            </View>
            <View style={{marginBottom: 12}}>
              <Text
                style={{fontSize: 16, fontWeight: '400', marginVertical: 8}}>
                Mobile No
              </Text>
              <Feather
                name="phone"
                size={20}
                style={styles.icons}
                color={COLORS.buttonColor}
              />
              <View style={styles.input}>
                <TextInput
                  placeholder="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  placeholderTextColor={COLORS.black}
                  keyboardType="phone-pad"
                  style={{width: '100%'}}
                />
              </View>
            </View>
            <View style={{marginBottom: 12}}>
              <Text
                style={{fontSize: 16, fontWeight: '400', marginVertical: 8}}>
                Address
              </Text>
              <Entypo
                name="address"
                size={20}
                style={styles.icons}
                color={COLORS.buttonColor}
              />
              <View style={styles.input}>
                <TextInput
                  placeholder="Address"
                  value={address}
                  onChangeText={setAddress}
                  placeholderTextColor={COLORS.black}
                  style={{width: '100%'}}
                />
              </View>
            </View>
            <AnimatedButton
              title="Update Profile"
              filled
              style={{marginTop: 18, marginBottom: 4}}
              onPress={updateProfile}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  logins: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    paddingHorizontal: 20,
    paddingVertical: 50,
    marginTop: 35,
    borderTopLeftRadius: 120,
  },
  icons: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
  profile: {
    padding: 24,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    left: 10,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

export default Profile;
