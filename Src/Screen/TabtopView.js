import * as React from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import BookingHistory from './BookingHistory';
import Color from '../Constant/Color';
const Completed = () => (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    {/* <Text>Completed</Text> */}
    <BookingHistory />
  </View>
);

const Cancelled = () => (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    {/* <Text>Cancelled</Text> */}
    <BookingHistory />
  </View>
);

const renderScene = SceneMap({
  Completed: Completed,
  Cancelled: Cancelled,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Completed', title: 'Completed'},
    {key: 'Cancelled', title: 'Cancelled'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      tabBarStyle={{backgroundColor: Color.buttonColor}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: 'white'}}
          style={{backgroundColor: Color.buttonColor}}
        />
      )}
    />
  );
}
