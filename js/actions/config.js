/**
 * @flow
 */

'use strict';

import Parse from 'parse/react-native';
import { InteractionManager } from 'react-native';
import type { Action } from './types';

async function loadConfig(): Promise<Action> {
  const config = await Parse.Config.get();
  await InteractionManager.runAfterInteractions();
  return {
    type: 'LOADED_CONFIG',
    config,
  };
}

module.exports = { loadConfig };
