import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Splacescreen from '../Screen/Splacescreen';
import Onboarding from '../Screen/Onboarding';
import Login from '../Screen/Login';
import Register from '../Screen/Register';
import OTP from '../Screen/OTP';
import ForgetPassword from '../Screen/ForgetPassword';
import ForgotOTP from '../Screen/ForgotOTP';
import NewPassword from '../Screen/NewPassword';
import Home from '../Screen/Home';
import Menu from '../Screen/Menu';
import TabtopView from '../Screen/TabtopView';
import SearchVehicle from '../Screen/SearchVehicle';
import BookNow from '../Screen/BookNow';
import Profile from '../Screen/Profile';
import BookingHistory from '../Screen/BookingHistory';
import Wallet from '../Screen/Wallet';
import LoginPhone from '../Screen/LoginPhone';
import Notification from '../Screen/Notification';
import Aboutus from '../Screen/Aboutus';
import Package from '../Screen/Package';
import PackageBook from '../Screen/PackageBook';
import Contact from '../Screen/Contact';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={Menu}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splacescreen">
        <Stack.Screen
          name="Splacescreen"
          component={Splacescreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginPhone"
          component={LoginPhone}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotOTP"
          component={ForgotOTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={MyDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabtopView"
          component={TabtopView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchVehicle"
          component={SearchVehicle}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Package"
          component={Package}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookNow"
          component={BookNow}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PackageBook"
          component={PackageBook}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookingHistory"
          component={BookingHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Aboutus"
          component={Aboutus}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
