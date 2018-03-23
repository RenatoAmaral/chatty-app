import React, {Component} from 'react';


class Message extends Component {

  render() {

    const message = this.props.message;

   if (message.type === "incomingMessage") {
      return (

        <li className="message">

          <span className="message-username">{message.username}:</span>

          <span className="message-content">{message.content}</span>

        </li>

      );

    } else if (message.type === "incomingNotification") {

      return (

        <li className="notification">

          <span className="notification-content">{message.content}</span>

        </li>

      );
    }

  }

}

export default Message;