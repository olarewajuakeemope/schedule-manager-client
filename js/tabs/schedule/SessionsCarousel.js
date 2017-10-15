/**
 * @flow
 */
'use strict';

const Parse = require('parse/react-native');
// const {AppEventsLogger} = require('react-native-fbsdk');
const React = require('react');
const SMSessionDetails = require('./SMSessionDetails');
const SMPageControl = require('../../common/SMPageControl');
const SMHeader = require('../../common/SMHeader');
const StyleSheet = require('../../common/SMStyleSheet');
const Platform = require('Platform');
const formatTime = require('./formatTime');
const Carousel = require('../../common/Carousel');

const {connect} = require('react-redux');
const {loadFriendsSchedules, shareSession} = require('../../actions');

import type {Dispatch} from '../../actions/types';

const {
  Text,
  View,
  Navigator,
} = require('react-native');

import type {Session} from '../../reducers/sessions';

type Context = {
  rowIndex: number; // TODO: IndexWithinSection
  sectionLength: number;
  sectionTitle: string;
};

type Props = {
  allSessions?: {[sectionID: string]: {[sessionID: string]: Session}};
  session: Session;
  navigator: Navigator;
  dispatch: Dispatch;
};

class SessionsCarusel extends React.Component {
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

    var flatSessionsList = [];
    var contexts: Array<Context> = [];
    var allSessions = this.props.allSessions;
    if (!allSessions) {
      const {session} = this.props;
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

    const selectedIndex = flatSessionsList.findIndex((s) => s.id === this.props.session.id);
    if (selectedIndex === -1) {
      console.log(this.props.session);
      console.log(flatSessionsList);
    }

    this.state = {
      day: this.props.session.day,
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
        navigator={this.props.navigator}
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
    this.props.navigator.pop();
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
