import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {

    console.log("Rendering <MessageList/>");

    const messagesArray = this.props.messages;

    const messagesMap = messagesArray.map((message) =>
      < Message message={message} key={message.id} content={message.content}/>
    );
    console.log(messagesMap);
    return (
      <ul className="message system">
        {messagesMap}
      </ul>
    );
  }
}

export default MessageList;