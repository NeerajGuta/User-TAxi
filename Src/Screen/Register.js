import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../Constant/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
import AnimatedButton from '../Constant/Button';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

const Register = ({navigation}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

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
          <View
            style={{marginVertical: 22, marginHorizontal: 22, paddingTop: 25}}>
            <Text style={styles.welcome}>Hi Create Account ! 👋</Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}>
              Fill your information below or register your social account !
            </Text>
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
                  placeholder="Enter your name"
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
                  placeholder="Enter your email address"
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
                  placeholder="Enter your mobile no"
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
                Password
              </Text>
              <Feather
                name="lock"
                size={20}
                style={styles.icons}
                color={COLORS.buttonColor}
              />
              <View style={styles.input}>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.black}
                  secureTextEntry={isPasswordShown}
                  style={{
                    width: '100%',
                  }}
                />

                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                  style={{
                    position: 'absolute',
                    right: 12,
                  }}>
                  {isPasswordShown == true ? (
                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                  ) : (
                    <Ionicons name="eye" size={24} color={COLORS.black} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginVertical: 6,
              }}>
              <CheckBox
                style={{marginRight: 8}}
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? COLORS.primary : undefined}
              />

              <Text>Remember Me</Text>
            </View>

            <AnimatedButton
              title="Sign Up"
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              onPress={() => navigation.navigate('Login')}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: COLORS.grey,
                  marginHorizontal: 10,
                }}
              />
              <Text style={{fontSize: 14}}>Or Login with</Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: COLORS.grey,
                  marginHorizontal: 10,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 22,
              }}>
              <Text style={{fontSize: 16, color: COLORS.black}}>
                Already have an account ?{' '}
              </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.buttonColor,
                    fontWeight: 'bold',
                    marginLeft: 6,
                  }}>
                  Sign In
                </Text>
              </Pressable>
            </View>
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
    marginTop: 50,
    borderTopLeftRadius: 120,
  },
  icons: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
});

export default Register;
