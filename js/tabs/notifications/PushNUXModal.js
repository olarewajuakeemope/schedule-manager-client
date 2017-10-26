/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import SMButton from '../../common/SMButton';
import SMColors from '../../common/SMColors';
import { Heading1, Paragraph } from '../../common/SMText';

class PushNUXModal extends Component {
  props: {
    onTurnOnNotifications: () => void;
    onSkipNotifications: () => void;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Image
            style={styles.image}
            source={require('./img/push-nux.png')}
          />
          <View style={styles.content}>
            <Heading1>
              Don't miss out!
            </Heading1>
            <Paragraph style={styles.text}>
              Turn on push notifications to see what’s happening at SM. You can
              always see in-app updates on this tab.
            </Paragraph>
            <SMButton
              style={styles.button}
              type="primary"
              caption="Turn on push notifications"
              onPress={this.props.onTurnOnNotifications}
            />
            <SMButton
              style={styles.button}
              type="secondary"
              caption="No thanks"
              onPress={this.props.onSkipNotifications}
            />
          </View>
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 49,
    backgroundColor: 'rgba(0, 0, 0, 0.66)',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  inner: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  image: {
    alignSelf: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginVertical: 20,
  },
  page: {
    borderTopWidth: 1,
    borderTopColor: SMColors.cellBorder,
    paddingTop: undefined,
    paddingBottom: 0,
  },
  button: {
    marginTop: 10,
    alignSelf: 'stretch',
  },
});

module.exports = PushNUXModal;
