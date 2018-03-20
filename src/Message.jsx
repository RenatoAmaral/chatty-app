import React, {Component} from 'react';


class Message extends Component {
  render() {

    const message = this.props.message;
    console.log("Rendering <Message/>");
    return (
      <li className="message">
        <span className="message-username">{message.username}:</span>
        <span className="message-content">{message.content}</span>
      </li>
    );
  }
}

export default Message;