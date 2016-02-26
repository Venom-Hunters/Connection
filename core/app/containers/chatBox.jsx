import React, {Component} from "react";
import ChatBody from "../components/chat_body";
import ChatInput from "../components/chat_input";

export default class App extends Component {
  render(){
    return(
      <div className="pure-u-1">
        <ChatBody />
        <ChatInput />
      </div>
    )
  };
}
