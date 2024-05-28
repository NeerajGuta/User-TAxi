import React, {useRef} from 'react';
import {TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const AnimatedButton = ({title, onPress}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Animation completed, you can trigger any action here
    });
  };

  const resetAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{scale: scaleValue}],
        // You can add more styles as needed
      }}>
      <TouchableOpacity
        style={styles.button}
        onPressIn={startAnimation}
        onPressOut={resetAnimation}
        onPress={onPress}
        activeOpacity={1} // Disables the default opacity change on press
      >
        <LinearGradient colors={['#00a551', '#00a551', '#00a551']}>
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00a551',
    paddingHorizontal: 25,
    paddingVertical: 18,
    marginTop: 30,
    width: responsiveWidth(65),
    borderRadius: 5,
    alignSelf: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
});

export default AnimatedButton;
