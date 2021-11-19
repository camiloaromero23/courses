import { useReducer } from "react";
import { doIncreaseBy, doReset } from "./actions/actions";
import { CounterState } from "./interfaces/interfaces";
import { counterReducer } from "./state/counterReducer";

const INITIAL_STATE: CounterState = {
  changes: 0,
  counter: 0,
  previous: 0,
};

const increaseValues = [1, 2, 3, 4, 5, 10];

export const CounterReducer = () => {
  const [counterState, dispatch] = useReducer(counterReducer, INITIAL_STATE);

  const handleReset = () => {
    dispatch(doReset());
  };

  const handleIncrease = (value: number) => {
    dispatch(doIncreaseBy(value));
  };

  return (
    <>
      <h1>Segmented Counter Reducer</h1>
      <pre>{JSON.stringify(counterState, null, 2)}</pre>
      {increaseValues.map((v) => (
        <button key={v} onClick={() => handleIncrease(v)}>
          +{v}
        </button>
      ))}
      <button onClick={() => handleReset()}>Reset</button>
    </>
  );
};
