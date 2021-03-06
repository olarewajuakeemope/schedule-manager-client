/**
 * @flow
 */
'use strict';

const React = require('react');
const {StyleSheet} = require('react-native');
const SMButton = require('./SMButton');

const { logInWithFacebook } = require('../actions');
const {connect} = require('react-redux');

class LoginButton extends React.Component {
  props: {
    style: any;
    source?: string; // For Analytics
    dispatch: (action: any) => Promise;
    onLoggedIn: ?() => void;
  };
  state: {
    isLoading: boolean;
  };
  _isMounted: boolean;

  constructor() {
    super();
    this.state = { isLoading: false };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <SMButton
          style={[styles.button, this.props.style]}
          caption="Please wait..."
          onPress={() => {}}
        />
      );
    }

    return (
      <SMButton
        style={[styles.button, this.props.style]}
        caption={this.props.caption}
        onPress={() => this.logIn()}
      />
    );
  }

  async logIn() {
    const { dispatch, onLoggedIn, credentials } = this.props;
    const userdetails = credentials();

    this.setState({ isLoading: true });
    try {
      await Promise.race([
        dispatch(logInWithFacebook(this.props.source, userdetails)),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      } else {
        alert('Cannot connect to server.\nPlease check your network connection');
      }
      return;
    } finally {
      this._isMounted && this.setState({ isLoading: false });
    }

    onLoggedIn && onLoggedIn();
  }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

var styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 270,
  },
});

module.exports = connect()(LoginButton);
