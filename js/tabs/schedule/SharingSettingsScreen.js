/**
 * @flow
 */
'use strict';

import { StackNavigator } from 'react-navigation';
var SMColors = require('../../common/SMColors');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('../../common/SMText');
var FriendsUsingApp = require('./FriendsUsingApp');
var Switch = require('Switch');
var View = require('View');
var SMHeader = require('../../common/SMHeader');
var StatusBar = require('StatusBar');
var SharingSettingsCommon = require('./SharingSettingsCommon');

var { setSharingEnabled, logOutWithPrompt } = require('../../actions');
var { connect } = require('react-redux');

import type {State as User} from '../../reducers/user';

class SharingSettingsScreen extends React.Component {
  props: {
    navigator: StackNavigator;
    dispatch: () => void;
    sharedSchedule: boolean;
    user: User;
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="default"
         />
        <SharingSettingsCommon />
        <View style={styles.switchWrapper}>
          <Text style={styles.option}>
            NO
          </Text>
          <Switch
            accessibilityLabel="Let friends view your schedule"
            style={styles.switch}
            value={!!this.props.sharedSchedule}
            onValueChange={(enabled) => this.props.dispatch(setSharingEnabled(enabled))}
            onTintColor="#00E3AD"
          />
          <Text style={styles.option}>
            YES
          </Text>
        </View>
        <FriendsUsingApp />
        <SMHeader
          style={styles.header}
          foreground="dark"
          title="Settings"
          leftItem={{
            icon: require('../../common/img/back.png'),
            title: 'Back',
            layout: 'icon',
            onPress: () => this.props.navigator.pop(),
          }}
          rightItem={{
            icon: require('./img/logout.png'),
            title: 'Logout',
            onPress: () => this.props.dispatch(logOutWithPrompt()),
          }}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 49,
  },
  header: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    margin: 10,
  },
  option: {
    fontSize: 12,
    color: SMColors.lightText,
  },
});

function select(store) {
  return {
    user: store.user,
    sharedSchedule: store.user.sharedSchedule,
  };
}

module.exports = connect(select)(SharingSettingsScreen);
