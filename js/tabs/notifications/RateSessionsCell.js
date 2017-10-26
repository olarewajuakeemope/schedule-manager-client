/**
 * @flow
 */
'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import SMColors from '../../common/SMColors';
import { Text } from '../../common/SMText';

type Props = {
  numberOfSessions: number;
  onPress: () => void;
};

function RateSessionsCell({numberOfSessions, onPress}: Props) {
  const pluralSuffix = numberOfSessions === 1 ? '' : 's';
  return (
    <View style={styles.cell}>
      <Image
        style={styles.star}
        source={require('../../rating/img/full-star.png')}
      />
      <Text style={styles.text}>
        You have {numberOfSessions} session{pluralSuffix} to review
      </Text>

      <TouchableOpacity accessibilityTraits="button" onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.caption}>
            REVIEW
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

var styles = StyleSheet.create({
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  star: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginBottom: 2,
  },
  text: {
    fontSize: 15,
    color: SMColors.darkText,
    flex: 1,
  },
  button: {
    backgroundColor: '#6F86D9',
    height: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    color: 'white',
    letterSpacing: 1,
    fontSize: 12,
  },
});

module.exports = RateSessionsCell;
