/**
 * @providesModule SMTouchable
 * @flow
 */

'use strict';

import React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

function SMTouchableIOS(props: Object): ReactElement {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="#3C5EAE"
      {...props}
    />
  );
}

const SMTouchable = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : SMTouchableIOS;

module.exports = SMTouchable;
