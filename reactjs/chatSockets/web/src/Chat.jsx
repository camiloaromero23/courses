import React from "react";

export default function renderChat(props) {
  const { chat } = props;

  const renderChat = () => {
    console.log(chat);
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };
  return (
    <div className="render-chat">
      <h1>Chat lots</h1>
      {renderChat()}
    </div>
  );
}
