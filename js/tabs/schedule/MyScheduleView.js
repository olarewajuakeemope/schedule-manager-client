/**
 * @flow
 */
'use strict';

import { StackNavigator } from 'react-navigation';
var EmptySchedule = require('./EmptySchedule');
var SMButton = require('../../common/SMButton');
var FilterSessions = require('./filterSessions');
var ListContainer = require('../../common/ListContainer');
var LoginButton = require('../../common/LoginButton');
var ProfilePicture = require('../../common/ProfilePicture');
var React = require('React');
var PureListView = require('../../common/PureListView');
var ScheduleListView = require('./ScheduleListView');
var FriendsListView = require('./FriendsListView');

var { connect } = require('react-redux');

var {
  logOutWithPrompt,
  switchTab,
  switchDay,
  loadFriendsSchedules,
} = require('../../actions');

import type {Session} from '../../reducers/sessions';
import type {FriendsSchedule} from '../../reducers/friendsSchedules';
import type {State as User} from '../../reducers/user';
import type {State as Schedule} from '../../reducers/schedule';

var { createSelector } = require('reselect');


type Props = {
  user: User;
  sessions: Array<Session>;
  friends: Array<FriendsSchedule>;
  schedule: Schedule;
  navigator: StackNavigator;
  logOut: () => void;
  jumpToSchedule: (day: number) => void;
  loadFriendsSchedules: () => void;
};

// TODO: Rename to MySMView
class MyScheduleView extends React.Component {
  props: Props;

  constructor(props) {
    super(props);

    (this: any).renderEmptySessionsList = this.renderEmptySessionsList.bind(this);
    (this: any).openSharingSettings = this.openSharingSettings.bind(this);
    (this: any).handleSegmentChanged = this.handleSegmentChanged.bind(this);
  }

  render() {
    var rightItem;
    if (this.props.user.isLoggedIn) {
      rightItem = {
        title: 'Settings',
        icon: require('./img/settings.png'),
        onPress: this.openSharingSettings,
      };
    }

    const {id, isLoggedIn} = this.props.user;
    const profilePicture = isLoggedIn && id
      ? <ProfilePicture userID={id} size={100} />
      : null;

    return (
      <ListContainer
        title="My SM"
        parallaxContent={profilePicture}
        backgroundImage={require('./img/my-f8-background.png')}
        backgroundColor={'#A8D769'}
        onSegmentChange={this.handleSegmentChanged}
        rightItem={rightItem}>
        {this.renderContent()}
      </ListContainer>
    );
  }

  renderContent() {
    if (!this.props.user.isLoggedIn) {
      return (
        <PureListView
          renderEmptyList={this.renderNotLoggedIn}
        />
      );
    }

    return [
      <ScheduleListView
        title="Day 1"
        day={1}
        sessions={this.props.sessions}
        renderEmptyList={this.renderEmptySessionsList}
        navigator={this.props.navigator}
      />,
      <ScheduleListView
        title="Day 2"
        day={2}
        sessions={this.props.sessions}
        renderEmptyList={this.renderEmptySessionsList}
        navigator={this.props.navigator}
      />,
      <FriendsListView
        title="Friends"
        friends={this.props.friends}
        navigator={this.props.navigator}
      />,
    ];
  }

  renderNotLoggedIn() {
    return (
      <EmptySchedule
        key="login"
        title="Log in to make a schedule."
        text="You’ll be able to save sessions to your schedule to view or share later.">
        <LoginButton source="My SM" />
      </EmptySchedule>
    );
  }

  renderEmptySessionsList(day) {
    return (
      <EmptySchedule
        key="schedule"
        image={require('./img/no-sessions-added.png')}
        text={'Sessions you save will\nappear here.'}>
        <SMButton
          caption={`See the day ${day} schedule`}
          onPress={() => this.props.jumpToSchedule(day)}
        />
      </EmptySchedule>
    );
  }

  openSharingSettings() {
    this.props.navigator.push({shareSettings: 1});
  }

  handleSegmentChanged(segment) {
    if (segment === 2 /* friends */) {
      this.props.loadFriendsSchedules();
    }
  }
}

const data = createSelector(
  (store) => store.sessions,
  (store) => store.schedule,
  (sessions, schedule) => FilterSessions.bySchedule(sessions, schedule),
);

function select(store) {
  return {
    user: store.user,
    sessions: data(store),
    schedule: store.schedule,
    // Only show friends who have something in their schedule
    friends: store.friendsSchedules.filter(
      (friend) => Object.keys(friend.schedule).length > 0
    ),
  };
}

function actions(dispatch) {
  return {
    logOut: () => dispatch(logOutWithPrompt()),
    jumpToSchedule: (day) => dispatch([
      switchTab('schedule'),
      switchDay(day),
    ]),
    loadFriendsSchedules: () => dispatch(loadFriendsSchedules()),
  };
}

module.exports = connect(select, actions)(MyScheduleView);
