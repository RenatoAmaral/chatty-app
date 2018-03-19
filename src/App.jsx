import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";

 // state.messages = [
 //        {
 //            type: "incomingMessage",
 //            content: "I won't be impressed with technology until I can download food.",
 //            username: "Anonymous1"
 //        },
 //        {
 //            type: "incomingNotification",
 //            content: "Anonymous1 changed their name to nomnom",
 //        },
 //        {
 //            type: "incomingMessage",
 //            content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
 //            username: "Anonymous2"
 //        },
 //        {
 //            type: "incomingMessage",
 //            content: "...",
 //            username: "nomnom"
 //        },
 //        {
 //            type: "incomingMessage",
 //            content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
 //            username: "Anonymous2"
 //        },
 //        {
 //            type: "incomingMessage",
 //            content: "This isn't funny. You're not funny",
 //            username: "nomnom"
 //        },
 //        {
 //            type: "incomingNotification",
 //            content: "Anonymous2 changed their name to NotFunny",

 //        },

 //    ]


class App extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
      <main className="messages">
          <Message />
          <MessageList />
        </main>
        <ChatBar />
      </div>
    );
  }
}
export default App;
