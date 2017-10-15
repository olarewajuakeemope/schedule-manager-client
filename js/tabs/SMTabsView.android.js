/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import SMColors from '../common/SMColors';
import SMDrawerLayout from '../common/SMDrawerLayout';
import LoginButton from '../common/LoginButton';
import { Text } from '../common/SMText';
import MenuItem from './MenuItem';
import GeneralScheduleView from './schedule/GeneralScheduleView';


import { switchTab, logOutWithPrompt } from '../actions';
import { connect } from 'react-redux';

import type {Tab} from '../reducers/navigation';

class SMTabsView extends Component<{}> {
  props: {
    tab: Tab;
    onTabSelect: (tab: Tab) => void;
    navigator: StackNavigator;
  };

  constructor(props) {
    super(props);

    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  getChildContext() {
    return {
      openDrawer: this.openDrawer,
      hasUnreadNotifications: this.props.notificationsBadge > 0,
    };
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      // this.props.onTabSelect(tab);
      this.props.navigation.navigate(tab);
    }
    this.refs.drawer.closeDrawer();
  }

  renderNavigationView() {
    var scheduleIcon = this.props.day === 1
      ? require('./schedule/img/schedule-icon-1.png')
      : require('./schedule/img/schedule-icon-2.png');
    var scheduleIconSelected = this.props.day === 1
      ? require('./schedule/img/schedule-icon-1-active.png')
      : require('./schedule/img/schedule-icon-2-active.png');
    var accountItem, mySMItem, loginItem;

    if (this.props.user.isLoggedIn) {
      var name = this.props.user.name || '';
      accountItem = (
        <View>
          <Text style={styles.name}>
            hello
          </Text>
        </View>
      );
      mySMItem = (
        <MenuItem
          title="My SM"
          selected={this.props.tab === 'my-schedule'}
          onPress={this.onTabSelect.bind(this, 'my-schedule')}
          icon={require('./schedule/img/my-schedule-icon.png')}
          selectedIcon={require('./schedule/img/my-schedule-icon-active.png')}
        />
      );
    } else {
      accountItem = (
        <View>
          <Image source={require('./img/logo.png')} />
          <Text style={styles.name}>
            APRIL 12 + 13 / SAN FRANCISCO
          </Text>
        </View>
      );
      loginItem = (
        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>
            Log in to find your friends at SM.
          </Text>
          <LoginButton />
        </View>
      );
    }
    return (
      <View style={styles.drawer}>
      <Image
        style={styles.header}
        source={require('./img/drawer-header.png')}>
        {accountItem}
      </Image>
      <MenuItem
          title="Schedule"
          selected={this.props.tab === 'schedule'}
          onPress={this.onTabSelect.bind(this, 'schedule')}
          icon={scheduleIcon}
          selectedIcon={scheduleIconSelected}
        />
        {mySMItem}
        <MenuItem
          title="Maps"
          selected={this.props.tab === 'map'}
          onPress={this.onTabSelect.bind(this, 'map')}
          icon={require('./maps/img/maps-icon.png')}
          selectedIcon={require('./maps/img/maps-icon-active.png')}
        />
        <MenuItem
          title="Notifications"
          selected={this.props.tab === 'notifications'}
          onPress={this.onTabSelect.bind(this, 'notifications')}
          badge={this.props.notificationsBadge}
          icon={require('./notifications/img/notifications-icon.png')}
          selectedIcon={require('./notifications/img/notifications-icon-active.png')}
        />
        <MenuItem
          title="Info"
          selected={this.props.tab === 'info'}
          onPress={this.onTabSelect.bind(this, 'info')}
          icon={require('./info/img/info-icon.png')}
          selectedIcon={require('./info/img/info-icon-active.png')}
        />
        {loginItem}
      </View>
    );
  }

  renderContent() {
    switch (this.props.tab) {
      case 'schedule':
        return (
          <GeneralScheduleView
            navigator={this.props.navigator}
          />
        );

      case 'my-schedule':
        return (
          <View />
        );

      case 'map':
        return <View />;

      case 'notifications':
        return <View />;

      case 'info':
        return <View />;
    }
    throw new Error(`Unknown tab ${this.props.tab}`);
  }

  render() {
    return (
      <SMDrawerLayout
        ref="drawer"
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={this.renderNavigationView}>
        <View style={styles.content} key={this.props.tab}>
          {this.renderContent()}
      </View>
      </SMDrawerLayout>
    );
  }
}

SMTabsView.childContextTypes = {
  openDrawer: PropTypes.func,
  hasUnreadNotifications: PropTypes.number,
};

function select(store) {
  return {
    tab: store.navigation.tab,
    day: store.navigation.day,
    user: store.user,
    // notificationsBadge: unseenNotificationsCount(store) + store.surveys.length,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab)),
    logOut: () => dispatch(logOutWithPrompt()),
  };
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    justifyContent: 'flex-end',
  },
  name: {
    marginTop: 10,
    color: 'white',
    fontSize: 12,
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  loginText: {
    fontSize: 12,
    color: SMColors.lightText,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default connect(select, actions)(SMTabsView);