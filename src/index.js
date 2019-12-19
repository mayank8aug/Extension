import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Order from './containers/Order';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  componentDidMount() {
    let langCode;
    try {
      langCode = navigator.language.split('-')[0];
    } catch(ex) {
      langCode = "en";  
    }
    axios.get(`/localization/lang_${langCode}.json`)
    .then(res => {
      this.setState({ localizationConfig: res.data});
    });  
  }

  render() {
    const { localizationConfig } = this.state;
    return (
      <div>
        <Order localizationConfig={localizationConfig}/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
