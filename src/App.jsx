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
      currentUser: {name: 'Anonymous'},
      messages: []

    }
  }


/////////////////////////////////////////////////
//    Helper Functions requiring this.state    //
/////////////////////////////////////////////////

// On successful connection, wait for incoming messages from server

  componentDidMount() {


    const self = this;
    ws.onmessage = function (event) {
      const message = JSON.parse(event.data);
      const newMessages = self.state.messages.concat(message)

       //let message = this.state.messages.concat(data.content);
      // console.log("state:",message)
      console.log("receiving:", newMessages)

      self.setState({ messages: newMessages });



    }
  }

  addNewMessage(content){
    const newMessage = {
      id: uuidv4(),
      username: this.state.currentUser.name,
      content: content
    };

    const messages = this.state.messages.concat(newMessage)
    this.setState({ messages: messages })
    ws.send(JSON.stringify(newMessage));
  }

  addNewUser(content){

    console.log("state:", content);

     this.setState({ currentUser: { name: content }})
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