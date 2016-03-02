import React, {Component} from "react";
import Gravatar from  "gravatar";

class Avatar extends Component {
  render() {
    const avatar = Gravatar.url(this.props.email, {s: "50", r: "pg", d: "monsterid"});
    return(
      <div className="gravatarIcon">
        <img src={avatar} alt="avatar"></img>
      </div>
    );
  }
}

export default Avatar;
