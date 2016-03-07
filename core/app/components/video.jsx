import WebRtc from './react_simplewebrtc';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class VideoBox extends Component {

    constructor(props) {
        super(props);    
    }
    
    render() {
         var infoObject = {
           roomname : this.props.activeTeam ? this.props.activeTeam._id : "lobby",
           /*provide a valid url for signalmaster otherwise this won't work*/
           signalmasterUrl : "reylink.com:8888"
         };

        return ( <div className="videoBox">
               <WebRtc roomname={this.props.activeTeam ? this.props.activeTeam._id : "lobby"} options = {infoObject} />
          </div>  );
   }   
 }

 function mapStateToProps(state) {
   return {
     activeTeam: state.teams.active
   };
 }

 export default connect(mapStateToProps)(VideoBox);
