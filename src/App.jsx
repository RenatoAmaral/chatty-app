import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";

const ws = new WebSocket("ws://localhost:3001/");
////////////////////////////////////
//   React App Parent Component   //
////////////////////////////////////

class App extends Component {

  constructor(props){
    super(props);

    this.state = {

      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous

      messages: [
        {
          id: "1",
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: "2",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

/////////////////////////////////////////////////
//    Helper Functions requiring this.state    //
/////////////////////////////////////////////////

  componentDidMount() {


    console.log("componentDidMount <App />");



    setTimeout(() => {

      console.log("Simulating incoming message");

      // Add a new message to the list of messages in the data store

      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)

      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.

      this.setState({messages: messages})
    }, 3000);
  }

  addNewMessage(content){
    const newMessage = {
      id: Math.floor((Math.random()* 100) + 3),
      username: this.state.currentUser.name,
      content: content
    };

    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
    ws.send(JSON.stringify(messages));
  }


  render() {
    console.log("Rendering <App/>");
    return (

      <div>

        <main className="messages">

            <MessageList messages = {this.state.messages} />

        </main>

        <ChatBar addNewMessage={this.addNewMessage.bind(this)} currentUser = {this.state.currentUser} />

      </div>

    );

  }

}

export default App;