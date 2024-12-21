// TourPackageCard.js
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const TourPackageCard = ({image, price, packageName, days, code}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.packageName}>{packageName}</Text>
        <Text style={styles.days}>{days} days</Text>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.code}>Code: {code}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  detailsContainer: {
    padding: 10,
  },
  packageName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  days: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  code: {
    fontSize: 14,
    color: '#888',
  },
});

export default TourPackageCard;
