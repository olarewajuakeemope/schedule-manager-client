/**
 * @providesModule SMFriendGoing
 * @flow
 */
'use strict';

var ProfilePicture = require('../../common/ProfilePicture');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('../../common/SMText');
var View = require('View');
var Image = require('Image');
var SMTouchable = require('../../common/SMTouchable');

import type {FriendsSchedule} from '../../reducers/friendsSchedules';

class SMFriendGoing extends React.Component {
  props: {
    onPress: () => void;
    friend: FriendsSchedule;
  };

  render() {
    return (
      <SMTouchable onPress={this.props.onPress}>
        <View style={styles.container}>
          <ProfilePicture userID={this.props.friend.id} size={18} />
          <Text style={styles.name}>
            {this.props.friend.name}
          </Text>
          <Image source={require('../../common/img/disclosure.png')} />
        </View>
      </SMTouchable>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  name: {
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
  },
});

module.exports = SMFriendGoing;
