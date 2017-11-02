/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Parse from 'parse/react-native';
import {
  Text,
  View,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
// import {AppEventsLogger} from 'react-native-fbsdk';
import SMSessionDetails from './SMSessionDetails';
import SMPageControl from '../../common/SMPageControl';
import SMHeader from '../../common/SMHeader';
import formatTime from './formatTime';
import Carousel from '../../common/Carousel';

import {loadFriendsSchedules, shareSession} from '../../actions';

import type {Dispatch} from '../../actions/types';


import type {Session} from '../../reducers/sessions';

const StyleSheet = require('../../common/SMStyleSheet');

type Context = {
  rowIndex: number; // TODO: IndexWithinSection
  sectionLength: number;
  sectionTitle: string;
};

type Props = {
  allSessions?: {[sectionID: string]: {[sessionID: string]: Session}};
  session: Session;
  navigator: StackNavigator;
  dispatch: Dispatch;
};

class SessionsCarusel extends Component {
  props: Props;
  state: {
    day: number;
    count: number;
    selectedIndex: number;
    flatSessionsList: Array<Session>;
    contexts: Array<Context>;
  };

  constructor(props: Props) {
    super(props);

    const { params } = this.props.navigation.state;
    var flatSessionsList = [];
    var contexts: Array<Context> = [];
    var allSessions = params.allSessions;
    if (!allSessions) {
      const {session} = params;
      allSessions = {
        [formatTime(session.startTime)]: {[session.id]: session}
      };
    }

    // TODO: Add test
    for (let sectionID in allSessions) {
      const sectionLength = Object.keys(allSessions[sectionID]).length;
      let rowIndex = 0;
      for (let sessionID in allSessions[sectionID]) {
        const session = allSessions[sectionID][sessionID];
        flatSessionsList.push(session);
        contexts.push({
          rowIndex,
          sectionLength,
          sectionTitle: sectionID,
        });
        rowIndex++;
      }
    }

    const selectedIndex = flatSessionsList.findIndex((s) => s.id === this.props.navigation.state.params.session.id);
    if (selectedIndex === -1) {
      console.log(this.props.navigation.state.params.session);
      console.log(flatSessionsList);
    }

    this.state = {
      day: this.props.navigation.state.params.session.day,
      count: flatSessionsList.length,
      selectedIndex,
      flatSessionsList,
      contexts,
    };
    (this: any).dismiss = this.dismiss.bind(this);
    (this: any).handleIndexChange = this.handleIndexChange.bind(this);
    (this: any).renderCard = this.renderCard.bind(this);
    (this: any).shareCurrentSession = this.shareCurrentSession.bind(this);
  }

  render() {
    var {rowIndex, sectionLength, sectionTitle} = this.state.contexts[this.state.selectedIndex];
    var rightItem;
    if (Platform.OS === 'android') {
      rightItem = {
        title: 'Share',
        icon: require('./img/share.png'),
        onPress: this.shareCurrentSession,
      };
    }
    return (
      <View style={styles.container}>
        <SMHeader
          style={styles.header}
          leftItem={{
            layout: 'icon',
            title: 'Close',
            icon: require('../../common/BackButtonIcon'),
            onPress: this.dismiss,
          }}
          rightItem={rightItem}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>
              <Text style={styles.day}>DAY {this.state.day}</Text>
              {'\n'}
              <Text style={styles.time}>{sectionTitle}</Text>
            </Text>
            <SMPageControl
              count={sectionLength}
              selectedIndex={rowIndex}
            />
          </View>
        </SMHeader>
        <Carousel
          count={this.state.count}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={this.renderCard}
        />
      </View>
    );
  }

  renderCard(index: number): ReactElement {
    return (
      <SMSessionDetails
        style={styles.card}
        navigation={this.props.navigation}
        session={this.state.flatSessionsList[index]}
        onShare={this.shareCurrentSession}
      />
    );
  }

  shareCurrentSession() {
    const session = this.state.flatSessionsList[this.state.selectedIndex];
    this.props.dispatch(shareSession(session));
  }

  componentDidMount() {
    this.track(this.state.selectedIndex);
    this.props.dispatch(loadFriendsSchedules());
  }

  dismiss() {
    this.props.navigation.goBack();
  }

  handleIndexChange(selectedIndex: number) {
    this.track(selectedIndex);
    this.setState({ selectedIndex });
  }

  track(index: number) {
    const {id} = this.state.flatSessionsList[index];
    Parse.Analytics.track('view', {id});
    // AppEventsLogger.logEvent('View Session', 1, {id});
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    android: {
      backgroundColor: '#5597B8',
    },
  },
  headerContent: {
    android: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    ios: {
      height: 65,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  title: {
    color: 'white',
    fontSize: 12,
    ios: {
      textAlign: 'center',
    },
  },
  day: {
    ios: {
      fontWeight: 'bold',
    },
    android: {
      fontSize: 9,
    },
  },
  time: {
    android: {
      fontWeight: 'bold',
      fontSize: 17,
    }
  },
  card: {
    ios: {
      borderRadius: 2,
      marginHorizontal: 3,
    },
  },
});

module.exports = connect()(SessionsCarusel);
