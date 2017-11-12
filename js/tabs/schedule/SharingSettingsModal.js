/**
 * @flow
 */
'use strict';

import { StackNavigator } from 'react-navigation';
var SMButton = require('../../common/SMButton');
var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');
var FriendsUsingApp = require('./FriendsUsingApp');
var SharingSettingsCommon = require('./SharingSettingsCommon');

var { setSharingEnabled } = require('../../actions');
var { connect } = require('react-redux');

class SharingSettingsModal extends React.Component {
  props: {
    navigation: StackNavigator;
    dispatch: () => void;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <SharingSettingsCommon style={{marginTop: -50}} />
          <FriendsUsingApp />
          <SMButton
            style={styles.button}
            caption="OK!"
            onPress={() => this.handleSetSharing(true)}
          />
          <SMButton
            type="secondary"
            caption="Not now"
            onPress={() => this.handleSetSharing(false)}
          />
        </View>
      </View>
    );
  }

  handleSetSharing(enabled: boolean) {
    this.props.dispatch(setSharingEnabled(enabled));
    this.props.navigation.goBack();
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
    backgroundColor: 'white',
    borderRadius: 3,
    alignItems: 'center',
    overflow: 'hidden',
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    alignSelf: 'stretch',
  },
});

module.exports = connect()(SharingSettingsModal);
