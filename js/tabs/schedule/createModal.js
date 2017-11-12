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
  TouchableOpacity,
} from 'react-native';
import LoginButton from '../../common/LoginButton';
import SMColors from '../../common/SMColors';
import { Text } from '../../common/SMText';
import SMButton from '../../common/SMButton';

class CreateModal extends React.Component {
  props: {
    navigator: StackNavigator;
    onLogin: () => void;
  };

  state = {
    caption: '',
    counterCaption: '',
    username: '',
    email: '',
    passowrd: '',
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

  render() {
    const {
      caption,
      counterCaption,
      email,
      password,
    } = this.state;

    return (
      <View style={styles.container}>
        <Image
          style={styles.content}
          source={require('../../login/img/login-background.png')}>
          <TouchableOpacity
            accessibilityLabel="Cancel"
            accessibilityTraits="button"
            style={styles.skip}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../../login/img/x.png')}
          />
        </TouchableOpacity>
          <Text style={styles.h1}>
            {caption}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              style={styles.input}
              autoCapitalize="none"
              placeholder="Enter Email"
              onChangeText={text => this.setState({})}
            />
            <TextInput
              value={password}
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholder="Enter Password"
              onChangeText={text => this.setState({})}
            />
          </View>
          <LoginButton
            caption={caption}
            onLoggedIn={() => this.loggedIn()}
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
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
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

module.exports = CreateModal;
