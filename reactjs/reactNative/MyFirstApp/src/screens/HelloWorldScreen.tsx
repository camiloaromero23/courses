import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const HelloWorldScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Halooo</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 45,
    textAlign: 'center',
  },
});
