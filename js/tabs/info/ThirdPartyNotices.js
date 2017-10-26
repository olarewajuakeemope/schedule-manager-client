/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  InteractionManager,
  WebView,
} from 'react-native';
import SMHeader from '../../common/SMHeader';

class ThirdPartyNotices extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SMHeader
          title="Third Party Notices"
          style={styles.header}
          leftItem={{
            icon: require('../../common/img/back_white.png'),
            title: 'Back',
            layout: 'icon',
            onPress: () => this.props.navigator.pop(),
          }}
        />
        <Loading>
          <WebView
            style={styles.webview}
            source={{uri: 'file:///android_res/raw/third_party_notices.html'}}
          />
        </Loading>
      </View>
    );
  }
}

class Loading extends React.Component {
  state = {
    loaded: false,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => this.setState({loaded: true}));
  }

  render() {
    if (this.state.loaded) {
      return React.Children.only(this.props.children);
    }
    return null;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#47BFBF',
  },
  webview: {
    flex: 1,
  },
});

module.exports = ThirdPartyNotices;
