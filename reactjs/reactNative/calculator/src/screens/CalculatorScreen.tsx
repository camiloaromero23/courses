import React from 'react';
import { Text, View } from 'react-native';
import { CalculatorButton } from '../components/CalculatorButton';
import { styles } from '../theme/AppTheme';
import { useCalculator } from '../hooks/useCalculator';

export const CalculatorScreen = () => {
  const {
    add,
    calculate,
    clear,
    createNumber,
    deleteNumber,
    divide,
    multiply,
    number,
    positiveNegative,
    prevNumber,
    substract,
  } = useCalculator();
  return (
    <View style={styles.calculatorContainer}>
      <Text style={styles.smallResult}>{prevNumber !== '0' && prevNumber}</Text>
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {number}
      </Text>
      <View style={styles.row}>
        <CalculatorButton text="C" backgroundColor="#9B9B9B" action={clear} />
        <CalculatorButton
          text="+/-"
          backgroundColor="#9B9B9B"
          action={positiveNegative}
        />
        <CalculatorButton
          text="del"
          backgroundColor="#9B9B9B"
          action={deleteNumber}
        />
        <CalculatorButton text="÷" backgroundColor="#FF9427" action={divide} />
      </View>
      <View style={styles.row}>
        <CalculatorButton text="7" action={createNumber} />
        <CalculatorButton text="8" action={createNumber} />
        <CalculatorButton text="9" action={createNumber} />
        <CalculatorButton
          text="×"
          backgroundColor="#FF9427"
          action={multiply}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton text="4" action={createNumber} />
        <CalculatorButton text="5" action={createNumber} />
        <CalculatorButton text="6" action={createNumber} />
        <CalculatorButton
          text="-"
          backgroundColor="#FF9427"
          action={substract}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton text="1" action={createNumber} />
        <CalculatorButton text="2" action={createNumber} />
        <CalculatorButton text="3" action={createNumber} />
        <CalculatorButton text="+" backgroundColor="#FF9427" action={add} />
      </View>
      <View style={styles.row}>
        <CalculatorButton text="0" wide action={createNumber} />
        <CalculatorButton text="," action={createNumber} />
        <CalculatorButton
          text="="
          backgroundColor="#FF9427"
          action={calculate}
        />
      </View>
    </View>
  );
};
