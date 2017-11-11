/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  StatusBar,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import SMColors from '../common/SMColors';
import { Text } from '../common/SMText';
import LoginModal from './LoginModal';
import SMButton from '../common/SMButton';

import { skipLogin } from '../actions';

class LoginScreen extends Component {
  state = {
    anim: new Animated.Value(0),
    signup: false,
  };

  componentDidMount() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  loginModal = (source) => {
    if (source === 'login') {
      this.setState({
        signup: true,
        caption: 'Log In',
      });
    } else {
      this.setState({
        signup: true,
        caption: 'Sign Up',
      });
    }
  }

  render() {
    if (this.state.signup) {
      return <LoginModal caption={this.state.caption} />;
    }
    return (
      <Image
        style={styles.container}
        source={require('./img/login-background.png')}>
        <StatusBar barStyle="default" />
        <TouchableOpacity
          accessibilityLabel="Skip login"
          accessibilityTraits="button"
          style={styles.skip}
          onPress={() => this.props.dispatch(skipLogin())}>
          <Animated.Image
            style={this.fadeIn(2800)}
            source={require('./img/x.png')}
          />
        </TouchableOpacity>
        <View style={styles.section}>
          <Animated.Image
            style={this.fadeIn(0)}
            source={require('./img/devconf-logo.png')}
          />
        </View>
        <View style={styles.section}>
          <Animated.Text style={[styles.h1, this.fadeIn(700, -20)]}>
            schedule
          </Animated.Text>
          <Animated.Text style={[styles.h1, { marginTop: -30 }, this.fadeIn(700, 20)]}>
            manager
          </Animated.Text>
          <Animated.Text style={[styles.h2, this.fadeIn(1000, 10)]}>
            Designed By Yours Truly
          </Animated.Text>
          <Animated.Text style={[styles.h3, this.fadeIn(1200, 10)]}>
            OLAREWAJU AKEEM OPEYEMI
          </Animated.Text>
        </View>
        <Animated.View style={[styles.section, styles.last, this.fadeIn(2500, 20)]}>
          <TouchableOpacity
            accessibilityLabel="Sign Up"
            accessibilityTraits="button"
            onPress={() => this.loginModal('signup')}>
            <Text style={styles.loginComment}>
              SIGN UP
            </Text>
          </TouchableOpacity>
          <SMButton
            caption="Log in"
            style={styles.button}
            onPress={() => this.loginModal('login')}
          />
        </Animated.View>
      </Image>
    );
  }

  fadeIn(delay, from = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }
}

const scale = Dimensions.get('window').width / 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    width: 270,
  },
  last: {
    justifyContent: 'flex-end',
  },
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Math.round(74 * scale),
    color: SMColors.darkText,
    backgroundColor: 'transparent',
  },
  h2: {
    textAlign: 'center',
    fontSize: 17,
    color: SMColors.darkText,
    marginVertical: 20,
  },
  h3: {
    fontSize: 12,
    textAlign: 'center',
    color: SMColors.lightText,
    letterSpacing: 1,
  },
  loginComment: {
    marginBottom: 14,
    fontSize: 12,
    fontWeight: 'bold',
    color: SMColors.lightText,
    textAlign: 'center',
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
  },
});

export default connect()(LoginScreen);
