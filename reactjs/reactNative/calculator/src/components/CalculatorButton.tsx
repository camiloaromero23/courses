import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

interface Props {
  text: string;
  backgroundColor?: '#2D2D2D' | '#FF9427' | '#9B9B9B';
  wide?: boolean;
  action: (numberText: string) => void;
  // action: () => void | ((numberText: string) => void);
}

export const CalculatorButton: React.FC<Props> = ({
  action,
  text,
  backgroundColor = '#2D2D2D',
  wide = false,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        action(text);
      }}>
      <View
        style={{
          ...styles.button,
          backgroundColor,
          width: wide ? 180 : 80,
        }}>
        <Text
          style={{
            ...styles.buttonText,
            color: backgroundColor === '#9B9B9B' ? 'black' : 'white',
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 80,
    backgroundColor: '#2D2D2D',
    borderRadius: 100,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    color: 'white',
    fontWeight: '500',
  },
});
