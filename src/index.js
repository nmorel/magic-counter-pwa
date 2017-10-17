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

    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
      navigator.serviceWorker
        .register(`${process.env.PUBLIC_URL}/service-worker.js`)
        .then(reg => {
          // updatefound is fired if service-worker.js changes.
          reg.onupdatefound = () => {
            // The updatefound event implies that reg.installing is set; see
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = reg.installing;

            installingWorker.onstatechange = () => {
              switch (installingWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    // At this point, the old content will have been purged and the fresh content will
                    // have been added to the cache.
                    // It's the perfect time to display a "New content is available; please refresh."
                    // message in the page's interface.
                    console.log('New or updated content is available.');
                    const response = window.confirm(
                      'A new version is available. Do you want to reload the page ?'
                    );
                    if (response) {
                      window.location.reload();
                    }
                  } else {
                    // At this point, everything has been precached.
                    // It's the perfect time to display a "Content is cached for offline use." message.
                    console.log('Content is now available offline!');
                  }
                  break;

                case 'redundant':
                  console.error('The installing service worker became redundant.');
                  break;
              }
            };
          };
        })
        .catch(e => {
          console.error('Error during service worker registration:', e);
        });
    }

    window.addEventListener(
      'resize',
      debounce(() => {
        this.store.dispatch({
          type: LAYOUT_CHANGE,
          payload: this.getLayout(),
        });
      }, 300),
      true
    );
  }

  getLayout = () => {
    const width = document.body.offsetWidth;
    const height = document.body.offsetHeight;
    return {
      width,
      height,
      layout: width > height ? 'LANDSCAPE' : 'PORTRAIT',
    };
  };

  render() {
    return (
      <Provider store={this.store}>
        <Game />
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
