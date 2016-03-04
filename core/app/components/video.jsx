import WebRtc from 'react-simplewebrtc';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class VideoBox extends Component {

    constructor(props) {
        super(props);
     }

    render() {
       var infoObject = {
         roomname : this.props.activeTeam._id,
         /*provide a valid url for signalmaster otherwise this won't work*/
        signalmasterUrl : "reylink.com:8888"
      };

    return (
          <div className="videoBox" style={{height: 300 + 'px'}}>
               <WebRtc style={{height: 200 + 'px'}} options = {infoObject} />
          </div>
           );
    }
 }

 function mapStateToProps(state) {
   return {
     activeTeam: state.teams.active
   };
 }

 export default connect(mapStateToProps)(VideoBox);
