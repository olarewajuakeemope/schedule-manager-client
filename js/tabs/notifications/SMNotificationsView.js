/**
 * @providesModule SMNotificationsView
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  Platform,
  ActionSheetIOS,
  Linking,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import EmptySchedule from '../schedule/EmptySchedule';
import PushNUXModal from './PushNUXModal';
import PureListView from '../../common/PureListView';
import ListContainer from '../../common/ListContainer';
// import NotificationCell from './NotificationCell';
import RateSessionsCell from './RateSessionsCell';
import allNotifications from './allNotifications';
import findSessionByURI from './findSessionByURI';
import {
  turnOnPushNotifications,
  skipPushNotifications,
  TEST_MENU,
} from '../../actions';
import { testMenuEnabled, version } from '../../env';


const data = createSelector(
  allNotifications,
  (store) => store.surveys,
  (store) => store.notifications.enabled,
  (notifications, surveys, enabled) => {
    const extra: Array<any> = [];
    if (surveys.length > 0) {
      extra.push({surveysCount: surveys.length});
    }
    return [...extra, ...notifications];
  }
);

class SMNotificationsView extends Component {

  constructor(props) {
    super(props);

    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).openNotification = this.openNotification.bind(this);
    (this: any).openReview = this.openReview.bind(this);
  }

  render() {
    var modal;
    if (this.props.nux) {
      modal = (
        <PushNUXModal
          onTurnOnNotifications={this.props.onTurnOnNotifications}
          onSkipNotifications={this.props.onSkipNotifications}
        />
      );
    }

    return (
      <View style={{flex: 1}}>
        <ListContainer
          title="Notifications"
          backgroundImage={require('./img/notifications-background.png')}
          backgroundColor={'#E78196'}
          {...this.renderTestItems()}>
          <PureListView
            data={this.props.notifications}
            renderEmptyList={this.renderEmptyList}
            renderRow={this.renderRow}
          />
        </ListContainer>
        {modal}
      </View>
    );
  }

  renderRow(notification) {
    if (notification.surveysCount) {
      return (
        <RateSessionsCell
          numberOfSessions={notification.surveysCount}
          onPress={this.openReview}
        />
      );
    }
    return (
      // <NotificationCell
      //   key={notification.id}
      //   notification={notification}
      //   onPress={() => this.openNotification(notification)}
      // />
      <View />
    );
  }

  renderEmptyList() {
    return (
      <EmptySchedule
        title="No Notifications Yet"
        text="Important updates and announcements will appear here"
      />
    );
  }

  openNotification(notification) {
    if (notification.url) {
      var session = findSessionByURI(this.props.sessions, notification.url);
      if (session) {
        this.props.navigator.push({session});
      } else {
        Linking.openURL(notification.url);
      }
    }
  }

  openReview() {
    this.props.navigator.push({
      rate: 1,
      surveys: this.props.surveys,
    });
  }

  renderTestItems() {
    if (!testMenuEnabled) {
      return {};
    }

    if (Platform.OS === 'ios') {
      return {
        rightItem: {
          title: 'Test',
          onPress: () => this.showTestMenu(),
        },
      };
    }

    if (Platform.OS === 'android') {
      return {
        extraItems: Object.keys(TEST_MENU).map((title) => ({
          title,
          onPress: () => this.props.dispatch(TEST_MENU[title]()),
        })),
      };
    }
  }

  showTestMenu() {
    const itemTitles = Object.keys(TEST_MENU);
    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Testing SM app v' + version,
      options: ['Cancel', ...itemTitles],
      cancelButtonIndex: 0,
    }, (idx) => {
        if (idx === 0) {
          return;
        }

        const action: any = TEST_MENU[itemTitles[idx - 1]];
        this.props.dispatch(action());
      }
    );
  }
}

function select(state) {
  return {
    nux: state.notifications.enabled === null,
    notifications: data(state),
    sessions: state.sessions,
    surveys: state.surveys,
  };
}

function actions(dispatch) {
  return {
    onTurnOnNotifications: () => dispatch(turnOnPushNotifications()),
    onSkipNotifications: () => dispatch(skipPushNotifications()),
    dispatch,
  };
}

module.exports = connect(select, actions)(SMNotificationsView);
