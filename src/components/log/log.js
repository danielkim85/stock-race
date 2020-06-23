import React, { Component } from 'react';
import { animateScroll } from "react-scroll";

import './log.css';

export default class Log extends Component {

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "myLog",
      duration:250,
      delay:0,
      offset: 200
    });
  }

  formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

  componentDidUpdate(prevProps) {
    if(prevProps.value === this.props.value){
      this.scrollToBottom();
      return;
    }

    let msg = this.state.msg;
    msg.push(<div key={msg.length}>{this.formatDate(new Date()) + ' : ' + this.props.value}</div>);
    this.setState({
      msg : msg
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      msg : []
    }
    //console.info(props);
  }

  render(){
    return (
      <div id="myLog" className={'log'}>
        {this.state.msg}
      </div>
    );
  }
}
