import React, {Component} from 'react';

export default class Message extends Component {

  componentDidUpdate () {

    this.closeMessage.focus();

  }
  render () {

    const displayMessage =
      (this.props.message !== "") ? {"display": "block"} : {"display": "none"};

    return (
      <div className = "message-overlay" style = {displayMessage} tabIndex = "1"
         ref={div => { this.closeMessage = div }} onKeyPress = {this.props.clearMessage}>
        <div className = "alert-message">
          <h1> Game Alert </h1>
          <p>{this.props.message}</p>
        <input placeholder = "Press Enter to Close Message" autoFocus value=""/>
        </div>
      </div>
    )
  }

}
