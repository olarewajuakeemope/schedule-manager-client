/**
 * @flow
 */

import React, { Component } from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
// TODO: Move from reselect to memoize?
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import EmptySchedule from './EmptySchedule';
import FilterHeader from './FilterHeader';
import FilterSessions from './filterSessions';
import ListContainer from '../../common/ListContainer';
import SMDrawerLayout from '../../common/SMDrawerLayout';
import ScheduleListView from './ScheduleListView';
import FilterScreen from '../../filter/FilterScreen';

import { switchDay } from '../../actions';

import type {Session} from '../../reducers/sessions';

const data = createSelector(
  (store) => store.sessions,
  (store) => store.filter,
  (sessions, filter) => FilterSessions.byTopics(sessions, filter),
);

type Props = {
  filter: any;
  day: number;
  sessions: Array<Session>;
  navigation: StackNavigator;
  logOut: () => void;
  switchDay: (day: number) => void;
};

class GeneralScheduleView extends Component {
  props: Props;
  _drawer: ?SMDrawerLayout;

  constructor(props) {
    super(props);

    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).switchDay = this.switchDay.bind(this);
    (this: any).openFilterScreen = this.openFilterScreen.bind(this);
    (this: any).renderNavigationView = this.renderNavigationView.bind(this);
  }

  render() {
    const filterItem = {
      icon: require('../../common/img/filter.png'),
      title: 'Filter',
      onPress: this.openFilterScreen,
    };

    const filterHeader = Object.keys(this.props.filter).length > 0
      ? <FilterHeader />
      : null;

    const content = (
      <ListContainer
        title="Schedule"
        selectedSegment={this.props.day - 1}
        onSegmentChange={this.switchDay}
        backgroundImage={require('./img/schedule-background.png')}
        backgroundColor="#5597B8"
        selectedSectionColor="#51CDDA"
        stickyHeader={filterHeader}
        rightItem={filterItem}>
        <ScheduleListView
          title="Day 1"
          day={1}
          sessions={this.props.sessions}
          renderEmptyList={this.renderEmptyList}
          navigation={this.props.navigation}
        />
        <ScheduleListView
          title="Day 2"
          day={2}
          sessions={this.props.sessions}
          renderEmptyList={this.renderEmptyList}
          navigation={this.props.navigation}
        />
      </ListContainer>
    );

    if (Platform.OS === 'ios') {
      return content;
    }
    return (
      <SMDrawerLayout
        ref={(drawer) => { this._drawer = drawer; }}
        drawerWidth={300}
        drawerPosition="right"
        renderNavigationView={this.renderNavigationView}
      >
        {content}
      </SMDrawerLayout>
    );
  }

  renderNavigationView() {
    return <FilterScreen onClose={() => this._drawer && this._drawer.closeDrawer()} />;
  }

  renderEmptyList(day: number) {
    return (
      <EmptySchedule
        title={`No sessions on day ${day} match the filter`}
        text="Check the schedule for the other day or remove the filter."
      />
    );
  }

  openFilterScreen() {
    if (Platform.OS === 'ios') {
      this.props.navigation.navigate('filter');
    } else {
      this._drawer && this._drawer.openDrawer();
    }
  }

  switchDay(page) {
    this.props.switchDay(page + 1);
  }
}


function select(store) {
  return {
    day: store.navigation.day,
    filter: store.filter,
    sessions: data(store),
  };
}

function actions(dispatch) {
  return {
    switchDay: (day) => dispatch(switchDay(day)),
  };
}

export default connect(select, actions)(GeneralScheduleView);