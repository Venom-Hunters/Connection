import React, {Component} from "react";
import Gravatar from  "gravatar";

class Avatar extends Component {
  render() {
    const icon = ["mm", "identicon", "monsterid", "wavatar", "retro"];
    const avatar = Gravatar.url(this.props.email, {s: "50", r: "pg", d: icon[Math.floor(Math.random()*4)]});
    return(
      <div>
        <img src={avatar} alt="avatar"></img>
      </div>
    )
  }
}

export default Avatar;