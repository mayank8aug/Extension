import React, { Component } from 'react';
import { render } from 'react-dom';
import Order from './containers/Order';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Order />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
