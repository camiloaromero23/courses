import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Example from "./components/Example";
import Bye from "./components/Bye";
import SayHello from "./components/SayHello";
function App() {
  const username = "camilo";
  const name = "Camilo";
  const age = "20";
  const lastname = "Romero";

  const user = { name, username, age, lastname };
  
  const SayHelloFunction = (name)=>{
    console.log("Hola " + name + " tiene " + age + "años");
    console.log(`Hi ${name} is ${age} years old`);
    
    
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <Example /> */}
        {/* <Bye /> */}
        <SayHello userInfo={user} SayHelloFunction = {SayHelloFunction} />
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
