'use strict';

import React, { Component } from 'react';
import {
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import SMTabsView from './tabs/SMTabsView';
import SMMapView from './tabs/maps/SMMapView';
import MyScheduleView from './tabs/schedule/MyScheduleView';
import SMInfoView from './tabs/info/SMInfoView';
import SMNotificationsView from './tabs/notifications/SMNotificationsView';

import FriendsScheduleView from './tabs/schedule/FriendsScheduleView';
import FilterScreen from './filter/FilterScreen';
import LoginModal from './login/LoginModal';
import SessionsCarousel from './tabs/schedule/SessionsCarousel';
import SharingSettingsModal from './tabs/schedule/SharingSettingsModal';
import SharingSettingsScreen from './tabs/schedule/SharingSettingsScreen';
import ThirdPartyNotices from './tabs/info/ThirdPartyNotices';
import RatingScreen from './rating/RatingScreen';

export const Navigator = StackNavigator({
  home: { screen: SMTabsView },
  map: { screen: SMMapView },
  mySchedule: { screen: MyScheduleView },
  notifications: { screen: SMNotificationsView },
  info: { screen: SMInfoView },
  allSessions: { screen: SessionsCarousel },
  filter: { screen: FilterScreen },
  friend: { screen: FriendsScheduleView },
  login: { screen: LoginModal },
  share: { screen: SharingSettingsModal },
  shareSettings: { screen: SharingSettingsScreen },
  rate: { screen: RatingScreen },
  notices: { screen: ThirdPartyNotices },
}, {
  navigationOptions: {
    tabBarVisible: false,
  },
  initialRouteName: 'home',
  headerMode: 'none',
});

class SMNavigator extends Component<{}> {
  _handlers = ([]: Array<() => boolean>);

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  }

  addBackButtonListener = (listener) => {
    this._handlers.push(listener);
  }

  removeBackButtonListener = (listener) => {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  }

  handleBackButton = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav
    });
    return (
      <Navigator navigation={navigation} />
    );
  }
}

SMNavigator.childContextTypes = {
  addBackButtonListener: PropTypes.func,
  removeBackButtonListener: PropTypes.func,
};

function select(store) {
  return {
    tab: store.navigation.tab,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    nav: store.nav,
  };
}

export default connect(select)(SMNavigator);
