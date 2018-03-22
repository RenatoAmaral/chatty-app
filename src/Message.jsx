import React, {Component} from 'react';


class Message extends Component {

  render() {

    const message = this.props.message;
    console.log("props",message);

   if (message.type === "incomingMessage") {
      console.log("first",message);
      return (

        <li className="message">

          <span className="message-username">{message.username}:</span>

          <span className="message-content">{message.content}</span>

        </li>

      );

    } else if (message.type === "incomingNotification") {

      console.log("second");
      return (

        <li className="notification">

          <span className="notification-content">{message.content}</span>

        </li>

      );
    }

  }

}

export default Message;