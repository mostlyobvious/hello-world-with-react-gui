import React from 'react';
import {Component, render} from 'react';

class GreetMessage extends Component {
  render() {
    return <div className="greet-message">
      <p>Hello, {this.props.name}</p>
      <a href="javascript:void(0);" onClick={this.props.restartClicked}>Restart</a>
    </div>
  }
}

class AskForName extends Component {
  render() {
    return <div className="ask-for-name">
      <p>What is your name?</p>
      <input type="text" value={this.props.name} onChange={this.props.nameChanged} />
      <button onClick={this.props.nameConfirmed.bind(null, this.props.name)}>Confirm</button>
    </div>
  }
}

class RootComponent extends Component {
  render() {
    var component =
      this.props.isNameConfirmed ? <GreetMessage
                                     restartClicked={this.props.restartClicked}
                                     name={this.props.name} />
                                 : <AskForName
                                     name={this.props.name}
                                     nameChanged={this.props.nameChanged}
                                     nameConfirmed={this.props.nameConfirmed} />
    return(component)
  }
}

class Gui {
  showAskForName() {
    render(<RootComponent
        name={''}
        isNameConfirmed={false}
        restartClicked={this.restartClicked}
        nameChanged={this.nameChanged.bind(this)}
        nameConfirmed={this.confirmNameButtonClicked} />,
      document.getElementById('main'))
  }

  showGreetMessage(name) {
    render(<RootComponent
        name={name}
        isNameConfirmed={true}
        restartClicked={this.restartClicked}
        nameChanged={this.nameChanged.bind(this)}
        nameConfirmed={this.confirmNameButtonClicked} />,
      document.getElementById('main'))
  }

  nameChanged(event) {
    render(<RootComponent
        name={event.target.value}
        isNameConfirmed={false}
        restartClicked={this.restartClicked}
        nameChanged={this.nameChanged.bind(this)}
        nameConfirmed={this.confirmNameButtonClicked} />,
      document.getElementById('main'))
  }

  restartClicked() {}

  confirmNameButtonClicked(name) {}
}


export default Gui
