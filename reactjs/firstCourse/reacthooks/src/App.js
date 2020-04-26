import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [stateCar, setStateCar] = useState(false);
  const [count, setCount] = useState(0);
  const onOff = () => {
    console.log("On/Off");
    setStateCar(prevValue => !prevValue);
    setCount(count + 1)
  }
  useEffect(() => {
    console.log("Total:", count);
  }, [count])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Car is: {stateCar ? "On" : "Off"} </h3>
        <h4>Clicks: {count}</h4>
        <button onClick={onOff}>On/Off</button>
      </header>
    </div>
  );
}

export default App;
