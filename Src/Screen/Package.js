import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import Color from '../Constant/Color';
import AnimatedButton from '../Constant/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';

const Package = ({navigation}) => {
  const [acc, setAcc] = useState(true);
  const [acc1, setAcc1] = useState(false);
  const [acc2, setAcc2] = useState(false);

  const handleChange = () => {
    setAcc(true);
    setAcc1(false);
    setAcc2(false);
  };
  const handleChange1 = () => {
    setAcc(false);
    setAcc1(true);
    setAcc2(false);
  };
  const handleChange2 = () => {
    setAcc(false);
    setAcc1(false);
    setAcc2(true);
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [accview, setAccview] = useState('');
  const handleView = () => {
    setAccview(!accview);
  };

  const handleNavigation = () => {
    navigation.navigate('PackageBook');
  };

  const data = [
    {
      id: 1,
      name: 'Hatchback',
      price: '₹2415',
      subname: 'Indica,swift Or Similar',
      image: '../Assets/HatchBack.png',
    },
    {
      id: 2,
      name: 'Book Now',
      price: '₹2415',
      subname: 'Indica,swift Or Similar',
      image: '../Assets/HatchBack.png',
    },
    {
      id: 2,
      name: 'Book Now',
      price: '₹2415',
      subname: 'Indica,swift Or Similar',
      image: '../Assets/HatchBack.png',
    },
    {
      id: 2,
      name: 'Book Now',
      price: '₹2415',
      subname: 'Indica,swift Or Similar',
      image: '../Assets/HatchBack.png',
    },
    {
      id: 2,
      name: 'Book Now',
      price: '₹2415',
      subname: 'Indica,swift Or Similar',
      image: '../Assets/HatchBack.png',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.backgroundColor}}>
      <View style={{flex: 1, backgroundColor: Color.backgroundColor}}>
        <View style={styles.containent}>
          <View>
            <FontAwesome5
              name="arrow-left"
              size={20}
              style={styles.icons}
              color="green"
              onPress={() => navigation.goBack()}
            />
            {/* <FontAwesome5
              name="walking"
              size={20}
              style={styles.icons}
              color="green"
            /> */}
            <View style={styles.input}>
              <TextInput
                placeholder="Pickup location "
                placeholderTextColor={Color.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View>
          {/* <View
            style={{
              marginBottom: 12,
              borderTopWidth: 1,
              borderColor: Color.grey,
            }}>
            <Entypo
              name="dot-single"
              size={20}
              style={styles.icons}
              color="red"
            />
            <View style={styles.input}>
              <TextInput
                placeholder="Drop location "
                placeholderTextColor={Color.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
              />
            </View>
          </View> */}
        </View>

        <View style={styles.section}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: '600',
              paddingLeft: 10,
            }}>
            Recommended for you
          </Text>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  handleChange(), toggleModal();
                }}>
                <Animated.View style={acc ? styles.sedanmini : styles.sedan}>
                  <Image
                    style={styles.image}
                    source={require('../Assets/car.png')}
                    resizeMode="contain" // Ensure the image fills the container
                  />
                  <View>
                    <Text style={styles.mean}>{item?.name}</Text>
                    <Text>{item?.subname}</Text>
                  </View>
                  <View>
                    <Text style={styles.mean}>{item.price}</Text>
                    {/* <Text style={[styles.mean]}>{item.price}</Text> */}
                  </View>
                </Animated.View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
      <View style={styles.modal}>
        <Modal isVisible={isModalVisible}>
          <View style={styles.congrats}>
            <AntDesign
              name="arrowleft"
              size={20}
              style={{paddingLeft: 10}}
              onPress={toggleModal}
            />
            <View style={styles.comback}>
              <View style={{width: 210}}>
                <Text
                  style={{fontSize: 17, fontWeight: '600', color: Color.black}}>
                  Hatchback
                </Text>
                <Text style={{textAlign: 'justify'}}>
                  Indica,swift Or Similar | Ac | 4 Seats
                </Text>
              </View>
              <Image
                source={require('../Assets/car.png')}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.comback}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image
                  source={require('../Assets/car.png')}
                  style={{width: 50, height: 30}}
                  resizeMode="cover"
                />
                <Text style={{paddingVertical: 10}}>Comfy Hatch</Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image
                  source={require('../Assets/money.png')}
                  style={{width: 30, height: 30}}
                  resizeMode="cover"
                />
                <Text style={{paddingVertical: 10}}>Pocket Friendly</Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image
                  source={require('../Assets/no-money.png')}
                  style={{width: 30, height: 30}}
                  resizeMode="cover"
                />
                <Text style={{paddingVertical: 10}}>Cashless Rides</Text>
              </View>
            </View>
            <View style={styles.comback1}>
              <Text style={styles.mean}>ITENARY</Text>
              <Text>&#x27A6;</Text>
              <Text>&#x27A6;</Text>
              <Text>&#x27A6;</Text>
            </View>
            <View style={styles.cabbook}>
              <View>
                <Text style={styles.mean}>Total fare</Text>
                <Text>Includes taxes</Text>
                <TouchableOpacity onPress={handleView}>
                  <Text style={{color: 'red', fontWeight: '600'}}>
                    View details
                  </Text>
                </TouchableOpacity>
                {accview ? (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                      }}>
                      <Text>Your Trip</Text>
                      <Text>₹613</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                      }}>
                      <Text>Toll/Parking</Text>
                      <Text>₹00.00</Text>
                    </View>
                    <Text>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s
                    </Text>
                  </>
                ) : (
                  <></>
                )}
              </View>
              <Text style={styles.mean}>₹613</Text>
            </View>
            <View style={styles.bookButton}>
              <AnimatedButton
                title="Book now"
                style={{
                  marginTop: 18,
                  marginBottom: 4,
                }}
                onPress={handleNavigation}
              />
            </View>
            {/* <AnimatedButton title="Hide modal" onPress={toggleModal} /> */}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Package;

const styles = StyleSheet.create({
  containent: {
    // flex: 0.05,
    // flexGrow: 1,
    // flexShrink: 1,
    borderBottomWidth: 1,
    borderColor: Color.grey,
    backgroundColor: Color.backgroundColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  icons: {
    position: 'absolute',
    top: 15,
    left: 10,
  },
  section: {
    // paddingLeft: 10,
    paddingVertical: 5,
    flex: 1,
  },
  sedan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  mean: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.black,
  },
  sedanmini: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 30,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: Color.backgroundColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#dbd3d340',
    borderRadius: 5,
  },
  image: {
    height: 40,
    width: 70,
  },
  bookButton: {
    alignSelf: 'center',
  },
  congrats: {
    minHeight: 400,
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: Color.backgroundColor,
    paddingVertical: 20,
  },
  comback: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  cabbook: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    borderRadius: 10,
    borderColor: Color.grey,
    padding: 20,
    borderWidth: 1,
  },
  comback1: {
    marginHorizontal: 15,
    borderColor: Color.grey,
    marginBottom: 10,
  },
});
