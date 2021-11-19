import { useReducer } from "react";

interface CounterState {
  counter: number;
  previous: number;
  changes: number;
}

const INITIAL_STATE: CounterState = {
  changes: 0,
  counter: 0,
  previous: 0,
};

type CounterAction =
  | {
      type: "increaseBy";
      payload: { value: number };
    }
  | {
      type: "reset";
    };

const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  const { counter, changes } = state;
  switch (action.type) {
    case "increaseBy":
      return {
        changes: changes + 1,
        counter: counter + action.payload.value,
        previous: counter,
      };
    case "reset":
      return {
        changes: 0,
        counter: 0,
        previous: 0,
      };
  }
};

const increaseValues = [1, 2, 3, 4, 5, 10];
export const CounterReducer = () => {
  const [counterState, dispatch] = useReducer(counterReducer, INITIAL_STATE);

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  const handleIncrease = (value: number) => {
    dispatch({ type: "increaseBy", payload: { value } });
  };

  return (
    <>
      <h1>Counter Reducer</h1>
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
