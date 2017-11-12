/**
 * @flow
 */

'use strict';

import { NavigationActions } from 'react-navigation'
const Parse = require('parse/react-native');
const ActionSheetIOS = require('ActionSheetIOS');
const {Platform} = require('react-native');
const Alert = require('Alert');
const {restoreSchedule, loadFriendsSchedules} = require('./schedule');
const {updateInstallation} = require('./installation');
const {loadSurveys} = require('./surveys');

import type { Action, ThunkAction } from './types';

async function _logInWithFacebook(source: ?string, userDetails: ?Object): Promise<Array<Action>> {
  const { email, password, username, type } = userDetails;
  let user;

  if (type === 'Log In') {
    user = await Parse.User.logIn(email, password);
  } else {
    user = await new Parse.User();
    user.set('username', email);
    user.set('password', password);
    user.set('email', email);
    await user.signUp(null);
    user.set('facebook_id', user.id);
    user.set('name', username);
    await user.save();
  }
  // await updateInstallation({user});

  const action = {
    type: 'LOGGED_IN',
    source,
    data: {
      id: user.id,
      name: user.get('name'),
      sharedSchedule: user.get('sharedSchedule'),
    },
  };

  return Promise.all([
    Promise.resolve(action),
    restoreSchedule(),
  ]);
}

function logInWithFacebook(source: ?string, user: ?Object): ThunkAction {
  return (dispatch) => {
    const login = _logInWithFacebook(source, user);

    // Loading friends schedules shouldn't block the login process
    login.then(
      (result) => {
        dispatch(result);
        dispatch(loadFriendsSchedules());
        dispatch(loadSurveys());
      }
    );
    return login;
  };
}

function skipLogin(): Action {
  return {
    type: 'SKIPPED_LOGIN',
  };
}

async function logUserOut(): Promise<Action> {
  await Parse.User.logOut();
}

function logOut(): ThunkAction {
  return (dispatch) => {
    const logout = logUserOut();
    logout.then(
      dispatch(NavigationActions.navigate({
        routeName: 'home',
      }))
    );
    // updateInstallation({user: null, channels: []});

    // TODO: Make sure reducers clear their state
    return dispatch({
      type: 'LOGGED_OUT', 
    });
  };
}

function logOutWithPrompt(): ThunkAction {
  return (dispatch, getState) => {
    let name = getState().user.name || 'there';

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: `Hi, ${name}`,
          options: ['Log out', 'Cancel'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            dispatch(logOut());
          }
        }
      );
    } else {
      Alert.alert(
        `Hi, ${name}`,
        'Log out from Schedule Manager?',
        [
          { text: 'Cancel' },
          { text: 'Log out', onPress: () => dispatch(logOut()) },
        ]
      );
    }
  };
}

module.exports = { logInWithFacebook, skipLogin, logOut, logOutWithPrompt };