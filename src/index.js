import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Game} from './views/Game';
import './index.css';
import {Provider} from 'react-redux';
import debounce from 'lodash/debounce';
import {LAYOUT_CHANGE} from './actions/actionTypes';

import {initStore} from './store';

class Root extends Component {

  componentWillMount() {
    const layout = this.getLayout();
    this.store = initStore({layout});

    window.addEventListener('resize', debounce((ev) => {
      this.store.dispatch({
        type: LAYOUT_CHANGE,
        payload: this.getLayout(),
      })
    }, 300), true);
  }

  getLayout = () => {
    const width = document.body.offsetWidth;
    const height = document.body.offsetHeight;
    return width > height ? 'LANDSCAPE' : 'PORTRAIT';
  };

  render() {
    return (
      <Provider store={this.store}>
        <Game />
      </Provider>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
