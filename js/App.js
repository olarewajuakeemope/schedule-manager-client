/**
 * @flow
 */

import React, { Component } from 'react';
import Parse from 'parse/react-native';
import Relay from 'react-relay/classic';
import { SERVER_URL, APP_ID } from 'react-native-dotenv';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import SMApp from './SMApp';

export default class App extends Component<{}> {
  state: {
    isLoading: boolean;
    store: any;
  };

  constructor() {
    super();
    console.disableYellowBox = true;
    Parse.initialize(APP_ID);
    Parse.serverURL = 'http://localhost:1337/parse';
    Relay.injectNetworkLayer(
      new Relay.DefaultNetworkLayer('http://localhost:1337/graphql', {
        fetchTimeout: 30000,
        retryDelays: [5000, 10000],
      }),
    );
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }
  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <SMApp />
      </Provider>
    );
  }
}

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};
