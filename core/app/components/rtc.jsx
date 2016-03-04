import WebRtc from 'react-simplewebrtc';
import React from 'react';
 
export default class WebRtcDemo extends React.Component {
  
    constructor(props) {
        super(props);
     }
     
           
    render() {
       var infoObject = {
         roomname : "test33333",
         /*provide a valid url for signalmaster otherwise this won't work*/
        signalmasterUrl : "reylink.com:8888"
       }
                                                       
    return (
          <div>
               <WebRtc options = {infoObject} />
          </div>
           );
    };
 }