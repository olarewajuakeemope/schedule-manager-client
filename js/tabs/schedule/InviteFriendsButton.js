/**
 * @flow
 */
'use strict';

var React = require('React');
var SMButton = require('../../common/SMButton');
// var {AppInviteDialog, AppEventsLogger} = require('react-native-fbsdk');
var { connect } = require('react-redux');

class InviteFriendsButton extends React.Component {
  props: {
    appLinkURL: string;
    appInvitePreviewImageURL: string;
    style: any;
  };

  render() {
    const { appLinkURL, style, navigation } = this.props;
    if (!appLinkURL) {
      return null;
    }

    return (
      <SMButton
        style={style}
        caption="Create New Private Schedule"
        onPress={() => navigation.navigate('createModal', { day: 3 })}
      />
    );
  }
}

function select(store) {
  return {
    appLinkURL: store.config.appLinkURL,
    appInvitePreviewImageURL: store.config.appInvitePreviewImageURL,
  };
}

module.exports = connect(select)(InviteFriendsButton);
