/**
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
  StatusBar,
  AppState,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import SMNavigator from './SMNavigator';
import LoginScreen from './login/LoginScreen';

class SMApp extends Component<{}> {
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'active') {
    }
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <LoginScreen />;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
        <SMNavigator />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

export default connect(select)(SMApp);
