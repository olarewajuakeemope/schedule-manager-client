/**
 * @flow
 */
'use strict';

const Parse = require('parse/react-native');

import type {Action} from '../actions/types';

function track(action: Action): void {
  switch (action.type) {

    case 'SESSION_ADDED':
      Parse.Analytics.track('addToSchedule', {id: action.id});
      break;

    case 'SESSION_REMOVED':
      Parse.Analytics.track('removeFromSchedule', {id: action.id});
      break;
  }
}

module.exports = track;
