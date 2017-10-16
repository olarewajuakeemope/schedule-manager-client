/**
 * @flow
 * @providesModule SMSpeakerProfile
 */

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import SMColors from '../../common/SMColors';
import { Text } from '../../common/SMText';

class SMSpeakerProfile extends Component {
  render() {
    var speaker = this.props.speaker;
    return (
      <View style={styles.row}>
        <Image style={styles.picture} source={{uri: speaker.pic}} />
        <View style={styles.info}>
          <Text style={styles.name}>{speaker.name}</Text>
          <Text style={styles.title}>{speaker.title}</Text>
        </View>
      </View>
    );
  }
}

const SIZE = 76;

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingBottom: 14,
    alignItems: 'center',
  },
  picture: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  info: {
    paddingLeft: 20,
    flex: 1,
  },
  name: {
    fontSize: 15,
    marginBottom: 2,
    color: SMColors.darkText,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    color: SMColors.darkText,
  },
});

module.exports = SMSpeakerProfile;
