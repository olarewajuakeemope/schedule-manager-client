/**
 * @flow
 */
'use strict';

import React from 'React';
import { StackNavigator } from 'react-navigation';
import {
  StyleSheet,
  Image,
  View,
  TextInput,
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

  state = {
    caption: this.props.caption,
    counterCaption: '',
    username: '',
    email: '',
    passowrd: '',
  }

  changeState = (caption) => {
    if (caption === 'Log In') {
      this.setState({
        caption: 'Sign Up',
        counterCaption: 'Log In',
      });
    } else {
      this.setState({
        caption: 'Log In',
        counterCaption: 'Sign Up',
      });
    }
  }

  componentWillMount() {
    const { caption } = this.props;
    if (caption === 'Sign Up') {
      this.setState({
        counterCaption: 'Log In',
      });
    } else {
      this.setState({
        counterCaption: 'Sign Up',
      });
    }
  }

  createCredentials = (text, field) => {
    const { email, username, password, caption } = this.state;
    const credentials = {
      username,
      email,
      password,
      type: caption,
    };
    if (field === 'email') {
      this.setState({
        email: text
      });
    } else if (field === 'password') {
      this.setState({
        password: text
      });
    } else if (field === 'username') {
      this.setState({
        username: text
      });
    } else {
      return credentials;
    }
  }

  render() {
    let extraInput = <View />;
    const {
      caption,
      counterCaption,
      email,
      password,
    } = this.state;

    if (caption === 'Sign Up') {
      extraInput = (
        <TextInput
          value={this.state.username}
          style={styles.input}
          autoCapitalize="none"
          placeholder="Enter Username"
          onChangeText={text => this.createCredentials(text, 'username')}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Image
          style={styles.content}
          source={require('./img/login-background.png')}>
          <Text style={styles.h1}>
            {caption}
          </Text>
          <View style={styles.inputContainer}>
            {extraInput}
            <TextInput
              value={email}
              style={styles.input}
              autoCapitalize="none"
              placeholder="Enter Email"
              onChangeText={text => this.createCredentials(text, 'email')}
            />
            <TextInput
              value={password}
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholder="Enter Password"
              onChangeText={text => this.createCredentials(text, 'password')}
            />
          </View>
          <LoginButton
            caption={caption}
            credentials={this.createCredentials}
            onLoggedIn={() => this.loggedIn()}
          />
          <Text style={styles.h3}>
            OR
          </Text>
          <SMButton
            type="secondary"
            caption={counterCaption}
            source="Modal"
            onPress={() => this.changeState(caption)}
          />
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    padding: 10,
    textAlign: 'left',
    alignItems: 'flex-start',
    width: 270,
  },
  input: {
    height: 40,
    width: 270,
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
    marginTop: 20,
  },
  h2: {
    fontSize: 18,
    lineHeight: 22,
    color: SMColors.darkText,
    textAlign: 'center',
    marginBottom: 20,
  },
  h3: {
    fontSize: 18,
    lineHeight: 22,
    color: SMColors.darkText,
    marginTop: 20,
    textAlign: 'center',
  },
  notNowButton: {
    padding: 20,
  },
  notNowLabel: {
    color: SMColors.lightText,
  }
});

module.exports = LoginModal;
