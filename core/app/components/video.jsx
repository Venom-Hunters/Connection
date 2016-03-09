import WebRtc from './react_simplewebrtc';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class VideoBox extends Component {

    constructor(props) {
        super(props);    
    }
    
    componentWillReceiveProps(props) {
    if (this.props.userName && !props.userName) {
    React.unmountComponentAtNode(document.getElementById('videoBox'));
    }
    
    }
    
    render() {
         var infoObject = {
           roomname : this.props.activeTeam ? this.props.activeTeam._id : "lobby",
           /*provide a valid url for signalmaster otherwise this won't work*/
           signalmasterUrl : "reylink.com:8888"
         };

        return ( <div id="videoBox" className="videoBox">
               <WebRtc roomname={this.props.activeTeam ? this.props.activeTeam._id : undefined} username={this.props.username} options = {infoObject} />
          </div>  );
   }   
 }

 function mapStateToProps(state) {
   return {
     activeTeam: state.teams.active,
     username: state.user.userName
   };
 }

 export default connect(mapStateToProps)(VideoBox);
