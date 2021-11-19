import { Counter } from "./bases/Counter";
import { CounterBy } from "./bases/CounterBy";
import { CounterEffect } from "./bases/CounterEffect";
import { CounterHook } from "./bases/CounterHook";
// import { CounterReducer } from "./bases/CounterReducer";
import { CounterReducer } from "./counter-reducer/CounterReducer";

function App() {
  return (
    <>
      <h1>React</h1>
      <hr />
      <Counter initialValue={23} />
      <CounterBy />
      <CounterEffect />
      <CounterHook />
      <CounterReducer />
    </>
  );
}

export default App;
