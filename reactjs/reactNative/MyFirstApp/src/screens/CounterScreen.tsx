import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Fab } from '../components/Fab';

export const CounterScreen = () => {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <Fab onPress={() => setCount(prev => prev - 1)} position="BL" title="-" />
      <Fab onPress={() => setCount(prev => prev + 1)} position="BR" title="+" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 45,
    textAlign: 'center',
    top: -15,
  },
});
