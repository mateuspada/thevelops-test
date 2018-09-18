import React, { Component } from 'react';
import Loginscreen from './Loginscreen'
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loginPage: [],
      screenPage: []
    }
  }

  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }

  render() {
    return (
      <div className="App">
        {this.state.loginPage}
      </div>
    );
  }
}

export default App;
