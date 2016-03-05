import React, {Component} from "react";
import ChatBody from "../components/chat_body";
import ChatInput from "../components/chat_input";
import VideoBox from "../components/video";

export default class App extends Component {
  render(){
    return(
      <div className="chatBox">
        <VideoBox />
        <ChatBody />
        <ChatInput />
      </div>
    );
  }
}
