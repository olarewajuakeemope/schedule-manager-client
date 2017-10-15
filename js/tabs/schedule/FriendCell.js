/**
 * @flow
 */

'use strict';

var SMColors = require('../../common/SMColors');
var React = require('React');
var Image = require('Image');
var StyleSheet = require('StyleSheet');
var { Text } = require('../../common/SMText');
var TouchableHighlight = require('TouchableHighlight');
var View = require('View');
var ProfilePicture = require('../../common/ProfilePicture');

import type {FriendsSchedule} from '../../reducers/friendsSchedules';

class FriendCell extends React.Component {
  props: {
    friend: FriendsSchedule;
    onPress: ?() => void;
  };

  render() {
    const {friend} = this.props;
    const hasSchedule = friend.schedule && Object.keys(friend.schedule).length > 0;
    const auxView = hasSchedule
      ? <Image source={require('../../common/img/disclosure.png')} />
      : <Text style={styles.private}>PRIVATE</Text>;

    const cell = (
      <View style={styles.cell}>
        <ProfilePicture userID={friend.id} size={42} />
        <Text style={styles.name}>
          {friend.name}
        </Text>
        {auxView}
      </View>
    );

    if (!hasSchedule) {
      return cell;
    }
    return (
      <TouchableHighlight underlayColor="#3C5EAE" onPress={this.props.onPress}>
        {cell}
      </TouchableHighlight>
    );
  }
}


var styles = StyleSheet.create({
  cell: {
    height: 60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 17,
    marginHorizontal: 10,
    color: SMColors.darkText,
  },
  private: {
    color: SMColors.lightText,
  }
});

module.exports = FriendCell;
