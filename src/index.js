import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Order from './containers/Order';
import Auth from './containers/Auth';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      loader: false,
      isLoggedIn: false
    };
  }

  componentDidMount() {
    let langCode;
    try {
      langCode = navigator.language.split('-')[0];
    } catch (ex) {
      langCode = "en";
    }
    axios.get(`/localization/lang_${langCode}.json`)
      .then(res => {
        this.setState({ localizationConfig: res.data });
      });
    this.sessionToken = 'c5d4056f-ee0b-405a-8939-d8c1d937658d'; { /* getCookies("http://www.lenskart.com", "frontend", function(id) {
        alert(id);
    }); */ }
    this.setState({ loader: true });
    axios.get('https://api.lenskart.com/v2/sessions/validate', { headers: { 'x-api-client': 'desktop', 'x-session-token': this.sessionToken } })
      .then(res => {
        if (res.data.result && res.data.result.attrs) {
          const { isLoggedIn } = res.data.result.attrs;
          this.setState({ isLoggedIn, loader: false });
        }
      }).catch(() => {
        this.setState({ isLoggedIn: false, loader: false });
      });
  }

  render() {
    const { localizationConfig, isLoggedIn, loader } = this.state;
    return (
      <div>
        {loader && <div className="loader">
          <img src="https://static.lenskart.com/media/desktop/img/loader.gif" alt="ldr" />
        </div>}
        {isLoggedIn ?
          <Order localizationConfig={localizationConfig} sessionToken={this.sessionToken} /> :
          <Auth />
        }
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
