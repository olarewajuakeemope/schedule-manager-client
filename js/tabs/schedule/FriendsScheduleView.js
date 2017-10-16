/**
 * @flow
 */
'use strict';

import React from 'React';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import ProfilePicture from '../../common/ProfilePicture';
import EmptySchedule from './EmptySchedule';
import FilterSessions from './filterSessions';
import ListContainer from '../../common/ListContainer';
import ScheduleListView from './ScheduleListView';


import type {Session} from '../../reducers/sessions';
import type {FriendsSchedule} from '../../reducers/friendsSchedules';

import { createSelector } from 'reselect';

type Props = {
  sessions: Array<Session>;
  friend: FriendsSchedule;
  navigator: StackNavigator;
};

class FriendsScheduleView extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
  }

  render() {
    const backItem = {
      icon: require('../../common/img/back_white.png'),
      onPress: () => this.props.navigator.pop(),
    };
    const firstName = this.props.friend.name.split(' ')[0];
    return (
      <ListContainer
        title={`${firstName}'s Schedule`}
        parallaxContent={<ProfilePicture userID={this.props.friend.id} size={100} />}
        backgroundImage={require('./img/schedule-background.png')}
        backgroundColor={'#5597B8'}
        selectedSectionColor="#51CDDA"
        leftItem={backItem}>
        <ScheduleListView
          title="Day 1"
          day={1}
          sessions={this.props.sessions}
          renderEmptyList={this.renderEmptyList}
          navigator={this.props.navigator}
        />
        <ScheduleListView
          title="Day 2"
          day={2}
          sessions={this.props.sessions}
          renderEmptyList={this.renderEmptyList}
          navigator={this.props.navigator}
        />
      </ListContainer>
    );
  }

  renderEmptyList(day) {
    return (
      <EmptySchedule
        title="Nothing to show."
        text={`${this.props.friend.name} has not added any sessions for day ${day}`}
      />
    );
  }
}

const data = createSelector(
  (store) => store.sessions,
  (store, props) => props.friend.schedule,
  (sessions, schedule) => FilterSessions.bySchedule(sessions, schedule),
);

function select(store, props) {
  return {
    sessions: data(store, props),
  };
}

module.exports = connect(select)(FriendsScheduleView);
