/**
 * @flow
 */
'use strict';

import { NavigationActions } from 'react-navigation';

const React = require('react');
const SMHeader = require('../common/SMHeader');
const SMColors = require('../common/SMColors');
const TopicItem = require('./TopicItem');
const SMButton = require('../common/SMButton');
var ItemsWithSeparator = require('../common/ItemsWithSeparator');

const {
  Animated,
  View,
  StyleSheet,
  ScrollView,
} = require('react-native');

const shallowEqual = require('fbjs/lib/shallowEqual');
const {
  applyTopicsFilter,
} = require('../actions');
const {connect} = require('react-redux');

class FilterScreen extends React.Component {
  props: {
    isLoggedIn: boolean,
    topics: Array<string>;
    selectedTopics: {[id: string]: boolean};
    dispatch: (action: any) => void;
    navigation: any;
    onClose: ?() => void;
  };
  state: {
    selectedTopics: {[id: string]: boolean};
    anim: Animated.Value;
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTopics: {...this.props.selectedTopics},
      anim: new Animated.Value(0),
    };

    (this: any).applyFilter = this.applyFilter.bind(this);
    (this: any).clearFilter = this.clearFilter.bind(this);
    (this: any).close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedTopics !== nextProps.selectedTopics) {
      this.setState({selectedTopics: {...nextProps.selectedTopics}});
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.selectedTopics !== nextState.selectedTopics) {
      const changedTopics = !shallowEqual(
        nextProps.selectedTopics,
        nextState.selectedTopics,
      );
      const toValue = changedTopics ? 1 : 0;
      Animated.spring(this.state.anim, {toValue}).start();
    }
  }

  render() {
    var bottom = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });
    var topics = this.props.topics.map((topic, ii) => (
      <TopicItem
        key={topic}
        topic={topic}
        color={SMColors.colorForTopic(this.props.topics.length, ii)}
        isChecked={this.state.selectedTopics[topic]}
        onToggle={this.toggleTopic.bind(this, topic)}
      />
    ));
    var selectedAnyTopics = this.props.topics.some(
      (topic) => this.state.selectedTopics[topic]
    );

    let leftItem, rightItem;
    if (this.props.navigation) {
      leftItem = {title: 'Cancel', onPress: this.close};
    }
    if (selectedAnyTopics) {
      rightItem = {
        title: 'Clear',
        icon: require('../common/img/x-white.png'),
        onPress: this.clearFilter,
      };
    }
    return (
      <View style={styles.container}>
        <SMHeader
          title="Filter"
          leftItem={leftItem}
          rightItem={rightItem}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollview}>
          <ItemsWithSeparator separatorStyle={styles.separator}>
            {topics}
          </ItemsWithSeparator>
        </ScrollView>
        <Animated.View style={[styles.applyButton, {bottom}]}>
          <SMButton
            caption="Apply filters"
            onPress={this.applyFilter}
          />
        </Animated.View>
      </View>
    );
  }

  toggleTopic(topic: string, value: boolean) {
    var selectedTopics = { ...this.state.selectedTopics };
    var value = !selectedTopics[topic];
    if (value) {
      selectedTopics[topic] = true;
    } else {
      delete selectedTopics[topic];
    }
    this.setState({ selectedTopics });
  }

  applyFilter() {
    this.props.dispatch(applyTopicsFilter(this.state.selectedTopics));
    this.close();
  }

  close() {
    const { navigation, onClose } = this.props;
    if (navigation) {
      requestAnimationFrame(() => this.props.dispatch(NavigationActions.back()));
    }
    if (onClose) {
      onClose();
    }
  }

  clearFilter() {
    this.setState({ selectedTopics: {} });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B3B79',
  },
  scrollview: {
    padding: 20,
    paddingBottom: 20 + 49,
  },
  separator: {
    backgroundColor: '#FFFFFF26',
  },
  applyButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: '#1B3B79',
  },
});

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn,
    friendsSchedules: store.friendsSchedules,
    topics: store.topics,
    selectedTopics: store.filter,
  };
}

module.exports = connect(select)(FilterScreen);
