import React, {Component} from 'react';



class ChatBar extends Component {

  handleNewMessage(e){
    const content = e.target.value
    if (e.key === 'Enter'){
      this.props.addNewMessage(content);
      e.target.value = '';
    }
  }

  render() {
    const currentUser = this.props.currentUser;

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          defaultValue={currentUser.name}
          placeholder="Your Name (Optional)"
        />
        <input
          className="chatbar-message"
          onKeyPress={this.handleNewMessage.bind(this)}
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}

export default ChatBar;