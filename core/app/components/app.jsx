import React, { Component } from "react";

import ChatBody from "../containers/chat_body";
import ChatInput from "../containers/chat_input";

export default class App extends Component {
  render(){
    return(
      <div className="container">
        <ChatBody />
        <ChatInput />
      </div>
    )
  };
}
