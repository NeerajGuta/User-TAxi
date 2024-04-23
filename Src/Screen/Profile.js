import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../Constant/Color';
import AnimatedButton from '../Constant/Button';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
const Profile = ({navigation}) => {
  const [profile, setprofile] = useState();
  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response.assets) {
        setprofile(response.assets[0]);
      }
    });
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
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              {profile ? (
                <Image source={profile} style={styles.profileAvatar} />
              ) : (
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                  }}
                  style={styles.profileAvatar}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleChoosePhoto();
              }}>
              <View style={styles.profileAction}>
                <FeatherIcon color="#fff" name="edit-3" size={15} />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.profileName}>Raghavendra Chaubey</Text>
              <Text style={styles.profileAddress}>
                123 Maple Street. Singapura, Bangalore
              </Text>
            </View>
          </View>

          <View style={styles.logins}>
            <View style={{marginBottom: 12}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}>
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
                  placeholder="Raghavendra Chaubey"
                  placeholderTextColor={COLORS.black}
                  keyboardType="email-address"
                  style={{
                    width: '100%',
                  }}
                />
              </View>
            </View>
            <View style={{marginBottom: 12}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}>
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
                  placeholder="raghavendrachaubey1998@gmail.com"
                  placeholderTextColor={COLORS.black}
                  keyboardType="email-address"
                  style={{
                    width: '100%',
                  }}
                />
              </View>
            </View>
            <View style={{marginBottom: 12}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}>
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
                  placeholder="9473925485"
                  placeholderTextColor={COLORS.black}
                  keyboardType="email-address"
                  style={{
                    width: '100%',
                  }}
                />
              </View>
            </View>
            <View style={{marginBottom: 12}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}>
                Address
              </Text>
              <Feather
                name="phone"
                size={20}
                style={styles.icons}
                color={COLORS.buttonColor}
              />
              <View style={styles.input}>
                <TextInput
                  placeholder="123 Maple Street,Singapura, Bangalore"
                  placeholderTextColor={COLORS.black}
                  keyboardType="email-address"
                  style={{
                    width: '100%',
                  }}
                />
              </View>
            </View>
            <AnimatedButton
              title="Update Profile"
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
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
    // backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
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
