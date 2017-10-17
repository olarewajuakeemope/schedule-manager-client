/**
 * @flow
 */

import React, { Component } from 'react';
import { TabBarIOS, View } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import SMColors from '../common/SMColors';
import GeneralScheduleView from './schedule/GeneralScheduleView';
import SMInfoView from './info/SMInfoView';
import SMMapView from './maps/SMMapView';
import SMNotificationsView from './notifications/SMNotificationsView';
import MyScheduleView from './schedule/MyScheduleView';
import unseenNotificationsCount from './notifications/unseenNotificationsCount';


import { switchTab } from '../actions';
import type {Tab, Day} from '../reducers/navigation';

class SMTabsView extends Component {
  props: {
    tab: Tab;
    day: Day;
    onTabSelect: (tab: Tab) => void;
    navigation: StackNavigator;
  };

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
  }

  render() {
    var scheduleIcon = this.props.day === 1
      ? require('./schedule/img/schedule-icon-1.png')
      : require('./schedule/img/schedule-icon-2.png');
    var scheduleIconSelected = this.props.day === 1
      ? require('./schedule/img/schedule-icon-1-active.png')
      : require('./schedule/img/schedule-icon-2-active.png');
    return (
      <TabBarIOS tintColor={SMColors.darkText}>
        <TabBarIOS.Item
          title="Schedule"
          selected={this.props.tab === 'schedule'}
          onPress={this.onTabSelect.bind(this, 'schedule')}
          icon={scheduleIcon}
          selectedIcon={scheduleIconSelected}>
          <GeneralScheduleView
            navigation={this.props.navigation}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="My SM"
          selected={this.props.tab === 'my-schedule'}
          onPress={this.onTabSelect.bind(this, 'my-schedule')}
          icon={require('./schedule/img/my-schedule-icon.png')}
          selectedIcon={require('./schedule/img/my-schedule-icon-active.png')}>
          <MyScheduleView
            navigation={this.props.navigation}
            onJumpToSchedule={() => this.props.onTabSelect('schedule')}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Maps"
          selected={this.props.tab === 'map'}
          onPress={this.onTabSelect.bind(this, 'map')}
          icon={require('./maps/img/maps-icon.png')}
          selectedIcon={require('./maps/img/maps-icon-active.png')}>
          <View />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Notifications"
          selected={this.props.tab === 'notifications'}
          onPress={this.onTabSelect.bind(this, 'notifications')}
          badge={this.props.notificationsBadge || null}
          icon={require('./notifications/img/notifications-icon.png')}
          selectedIcon={require('./notifications/img/notifications-icon-active.png')}>
          <View />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Info"
          selected={this.props.tab === 'info'}
          onPress={this.onTabSelect.bind(this, 'info')}
          icon={require('./info/img/info-icon.png')}
          selectedIcon={require('./info/img/info-icon-active.png')}>
          <View />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

}

function select(store) {
  return {
    tab: store.navigation.tab,
    day: store.navigation.day,
    // notificationsBadge: unseenNotificationsCount(store) + store.surveys.length,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab)),
  };
}

module.exports = connect(select, actions)(SMTabsView);