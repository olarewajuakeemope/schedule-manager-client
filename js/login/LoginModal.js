/**
 * @flow
 */
'use strict';

import React from 'React';
import { StackNavigator } from 'react-navigation';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import LoginButton from '../common/LoginButton';
import SMColors from '../common/SMColors';
import { Text } from '../common/SMText';
import SMButton from '../common/SMButton';

class LoginModal extends React.Component {
  props: {
    navigator: StackNavigator;
    onLogin: () => void;
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.content}
          source={require('./img/login-background.png')}>
          <Text style={styles.h1}>
            Log in with Facebook
          </Text>
          <Text style={styles.h2}>
            to save sessions to{'\n'}your schedule.
          </Text>
          <LoginButton onLoggedIn={() => this.loggedIn()} />
          <SMButton
            type="secondary"
            caption="Not Now"
            source="Modal"
            onPress={() => this.props.navigator.pop()}
          />
        </Image>
      </View>
    );
  }

  loggedIn() {
    this.props.navigator.pop();
    this.props.onLogin();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    padding: 30,
    backgroundColor: 'transparent',
    borderRadius: 3,
    alignItems: 'center',
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: SMColors.darkText,
    textAlign: 'center',
    marginTop: 130,
  },
  h2: {
    fontSize: 18,
    lineHeight: 22,
    color: SMColors.darkText,
    textAlign: 'center',
    marginBottom: 120,
  },
  notNowButton: {
    padding: 20,
  },
  notNowLabel: {
    color: SMColors.lightText,
  }
});

module.exports = LoginModal;
