import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";
import uuidv4 from 'uuid/v4';

const ws = new WebSocket("ws://localhost:3001/");
////////////////////////////////////
//   React App Parent Component   //
////////////////////////////////////

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
          currentUser: { name: 'Anonymous' },
          messages: []

        }
  }


/////////////////////////////////////////////////
//    Helper Functions requiring this.state    //
/////////////////////////////////////////////////

// On successful connection, wait for incoming messages from server

  componentDidMount() {

    console.log("Connected to chatty-app server");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch(message.type) {
        case "incomingMessage":
          const newMessages = this.state.messages.concat(message)
          console.log("newMessages:", newMessages);
          this.setState({ messages: newMessages });
        break;

        case "incomingNotification":
        console.log( "incomingNotification");
          this.setState({messages: [...this.state.messages, message]})
        break;

        default:
        throw new Error ("Unknown event type " + message.type);
      }
    }
  }

  addNewMessage(content){

    const newMessage = {
      id: uuidv4(),
      username: this.state.currentUser.name,
      content: content,
      type: "postMessage"
    };

    const messages = this.state.messages.concat(newMessage)
    //this.setState({ messages: messages })
    ws.send(JSON.stringify(newMessage));
  }

  addNewUser = (content) => {
    let msg = {
      type: "postNotification",
      content: `${this.state.currentUser.name} changed their name to ${content}.`
    }
    console.log("addNewUser", msg);
    ws.send(JSON.stringify(msg));
    this.setState({ currentUser: { name: content }});
  }



  render() {

    return (

      <div>

        <main className="messages">

            <MessageList messages = {this.state.messages} />

        </main>

        <ChatBar addNewMessage={this.addNewMessage.bind(this)} addNewUser={this.addNewUser.bind(this)} currentUser={this.state.currentUser} />

      </div>

    );

  }

}

export default App;