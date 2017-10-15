/**
 * @flow
 */
'use strict';

var SMColors = require('../../common/SMColors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('../../common/SMText');
var View = require('View');

var { connect } = require('react-redux');

class FriendsUsingApp extends React.Component {
  props: {
    friends: Array<{id: string; name: string}>;
  };

  render() {
    const {friends} = this.props;
    if (friends.length === 0) {
      return null;
    }
    const pictures = friends.slice(0, 3).map((friend) => (
      <Image
        key={friend.id}
        source={{uri: `http://graph.facebook.com/${friend.id}/picture`}}
        style={styles.profilePic}
      />
    ));
    let text = `${friends.length} friends are sharing their schedules.`;
    if (friends.length === 1) {
      text = `${friends[0].name.split(' ')[0]} is sharing their schedule.`;
    }
    return (
      <View style={styles.container}>
        {pictures}
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 20,
    height: 20,
    marginRight: -3,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    marginLeft: 13,
    color: SMColors.lightText,
  },
});

function select(store) {
  return {
    friends: store.friendsSchedules,
  };
}

module.exports = connect(select)(FriendsUsingApp);
