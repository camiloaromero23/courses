import React from "react";

export default function SayHello(props) {
  const{userInfo, SayHelloFunction} = props;
  const{username="anónimo", name="Anónimo", lastname="sin apellido"} = userInfo;
  console.log(props);

  return (
    <>
      {/* <h2> Hello Camilo</h2> */}
      <h1>
        Hello {username} {name} {lastname}
      </h1>
      <button onClick={()=>SayHelloFunction(name)}> Saludar</button>
    </>
  );
}
