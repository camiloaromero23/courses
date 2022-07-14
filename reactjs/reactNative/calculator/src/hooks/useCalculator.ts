import { useRef, useState } from 'react';

export const enum Operators {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operators>();

  const clear = () => {
    setNumber('0');
    setPrevNumber('0');
    lastOperation.current = undefined;
  };

  const createNumber = (numberText: string) => {
    if (number.includes(',') && numberText === ',') {
      return;
    }
    if (number.startsWith('0') || number.startsWith('-0')) {
      if (numberText === ',') {
        setNumber(num => num + numberText);
        return;
      }
      if (number.includes(',')) {
        setNumber(num => num + numberText);
        return;
      }
      if (numberText !== '0') {
        setNumber(numberText);
        return;
      }
      return;
    }
    setNumber(num => num + numberText);
  };

  const positiveNegative = () => {
    if (number.includes('-')) {
      setNumber(num => num.replace('-', ''));
    } else {
      setNumber(num => '-' + num);
    }
  };

  const deleteNumber = () => {
    if (number.includes('-') && number.length === 2) {
      setNumber('0');
      return;
    }
    if (number.length === 1) {
      setNumber('0');
      return;
    }
    setNumber(num => num.slice(0, -1));
  };

  const switchForPreviousNumber = () => {
    if (number.endsWith(',')) {
      setPrevNumber(number.slice(0, -1));
    }
    setPrevNumber(number);
    setNumber('0');
  };

  const add = () => {
    if (!lastOperation.current) {
      switchForPreviousNumber();
    }
    lastOperation.current = Operators.ADD;
  };
  const substract = () => {
    if (!lastOperation.current) {
      switchForPreviousNumber();
    }
    lastOperation.current = Operators.SUBTRACT;
  };
  const multiply = () => {
    if (!lastOperation.current) {
      switchForPreviousNumber();
    }
    lastOperation.current = Operators.MULTIPLY;
  };
  const divide = () => {
    if (!lastOperation.current) {
      switchForPreviousNumber();
    }
    lastOperation.current = Operators.DIVIDE;
  };

  const calculate = () => {
    let num1 = Number(prevNumber);
    let num2 = Number(number);

    let result = 0;
    switch (lastOperation.current) {
      case Operators.ADD: {
        result = num1 + num2;
        break;
      }
      case Operators.SUBTRACT: {
        result = num1 - num2;
        break;
      }
      case Operators.MULTIPLY: {
        num1 = isNaN(num1) ? 0 : num1;
        num2 = isNaN(num2) ? 0 : num2;

        result = num1 * num2;
        break;
      }
      case Operators.DIVIDE: {
        if (num2 === 0) {
          result = NaN;
          break;
        }
        result = num1 / num2;
        break;
      }
    }
    lastOperation.current = undefined;
    setPrevNumber('0');
    if (isNaN(result)) {
      setNumber('Error');
      return;
    }
    setNumber(result.toString());
  };

  return {
    add,
    calculate,
    clear,
    createNumber,
    deleteNumber,
    divide,
    lastOperation,
    multiply,
    number,
    positiveNegative,
    prevNumber,
    substract,
    switchForPreviousNumber,
  };
};
