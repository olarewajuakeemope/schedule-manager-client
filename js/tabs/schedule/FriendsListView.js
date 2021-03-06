/**
 * @flow
 */
'use strict';

import { StackNavigator } from 'react-navigation';
var EmptySchedule = require('./EmptySchedule');
var React = require('React');
var SessionsSectionHeader = require('./SessionsSectionHeader');
var InviteFriendsButton = require('./InviteFriendsButton');
var PureListView = require('../../common/PureListView');
var FriendCell = require('./FriendCell');

type Friend = any;

type Props = {
  friends: Array<Friend>;
  navigation: StackNavigator;
};

class FriendsListView extends React.Component {
  props: Props;
  _innerRef: ?PureListView;

  constructor(props: Props) {
    super(props);

    this._innerRef = null;

    (this: any).renderSectionHeader = this.renderSectionHeader.bind(this);
    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderFooter = this.renderFooter.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).storeInnerRef = this.storeInnerRef.bind(this);
  }

  render() {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.props.friends}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        renderEmptyList={this.renderEmptyList}
        renderFooter={this.renderFooter}
        {...(this.props: any /* flow can't guarantee the shape of props */)}
      />
    );
  }

  renderSectionHeader() {
    return <SessionsSectionHeader title="See a friend's schedule" />;
  }

  renderRow(friend: Friend) {
    return (
      <FriendCell
        friend={friend}
        onPress={() => this.openFriendsSchedule(friend)}
      />
    );
  }

  renderEmptyList(): ?ReactElement {
    return (
      <EmptySchedule
        image={require('./img/no-friends-found.png')}
        text={'You currently have no\nprivate Schedules'}>
        <InviteFriendsButton navigation={this.props.navigation} />
      </EmptySchedule>
    );
  }

  renderFooter() {
    return (
      <InviteFriendsButton
        navigation={this.props.navigation}
        style={{ margin: 20 }}
      />
    );
  }

  openFriendsSchedule(friend: Friend) {
    this.props.navigation.navigate('friend');
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }

  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }
}

module.exports = FriendsListView;
