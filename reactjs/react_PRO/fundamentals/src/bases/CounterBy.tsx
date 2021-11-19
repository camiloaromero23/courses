import { useState } from "react";

interface Props {
  initialValue?: number;
}

interface CounterState {
  counter: number;
  clicks: number;
}

export const CounterBy = ({ initialValue = 5 }: Props) => {
  const [{ counter, clicks }, setCounterState] = useState<CounterState>({
    counter: initialValue,
    clicks: 0,
  });

  const handleClick = (increaseBy: number) => {
    setCounterState(({ clicks, counter }) => ({
      clicks: clicks + 1,
      counter: counter + increaseBy,
    }));
  };

  return (
    <>
      <h1>CounterBy: {counter}</h1>
      <h1>Clicks: {clicks}</h1>
      <button onClick={() => handleClick(1)}>+1</button>
      <button onClick={() => handleClick(5)}>+5</button>
    </>
  );
};
