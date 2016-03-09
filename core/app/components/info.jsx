import React, {Component} from "react";

export default class Info extends Component {
  render() {
    return (
      <div className="align">
        <div className="info">
          <h2 className="infoTitle">Welcome!</h2>
          <p>Getting started is easy. Just follow these simple instructions:</p>
          <ol className="infoList">
            <li>To create a new team, click <i className="zmdi zmdi-plus-circle-o infoButton"></i></li>
            <li>Enter a name of the new team you want to create</li>
            <li>Click <button className="pure-button pure-button-primary" style={{cursor: 'text'}}>Create</button>!</li>
          </ol>
        </div>
      </div>
    );
  }
}
