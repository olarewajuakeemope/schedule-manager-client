/**
 * @flow
 */

'use strict';

const Parse = require('parse/react-native');
import { NavigationActions } from 'react-navigation'
const ActionSheetIOS = require('ActionSheetIOS');
const {Platform} = require('react-native');
const Alert = require('Alert');
const {restoreSchedule, loadFriendsSchedules} = require('./schedule');
const {updateInstallation} = require('./installation');
const {loadSurveys} = require('./surveys');

import type { Action, ThunkAction } from './types';

function signUp(source: ?string): ThunkAction {
  const user = new Parse.User();
  user.set("username", "user");
  user.set("password", "password");
  user.set("email", "email@example.com");
  
  // other fields can be set just like with Parse.Object
  user.set("phone", "415-392-0202");
  
  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
    }
  });
}

async function ParseFacebookLogin(scope): Promise {
  return new Promise((resolve, reject) => {
    Parse.FacebookUtils.logIn(scope, {
      success: resolve,
      error: (user, error) => reject(error && error.error || error),
    });
  });
}

async function queryFacebookAPI(path, ...args): Promise {
  // return new Promise((resolve, reject) => {
  //   FacebookSDK.api(path, ...args, (response) => {
  //     if (response && !response.error) {
  //       resolve(response);
  //     } else {
  //       reject(response && response.error);
  //     }
  //   });
  // });
}

async function _logInWithFacebook(source: ?string): Promise<Array<Action>> {
  // await ParseFacebookLogin('public_profile,email,user_friends');
  // const profile = await queryFacebookAPI('/me', {fields: 'name,email'});
  const profile = {
    id: 'sdfghjkuytrewertjmnhgfd',
    name: 'Olarewaju Opeyemi',
    email: 'olarewajuakeemopeyemi@gmail.com',
  };

  const user = await Parse.User.logIn("user", "password");
  user.set('facebook_id', profile.id);
  user.set('name', profile.name);
  user.set('email', profile.email);
  await user.save();
  // await updateInstallation({user});

  const action = {
    type: 'LOGGED_IN',
    source,
    data: {
      id: profile.id,
      name: profile.name,
      sharedSchedule: user.get('sharedSchedule'),
    },
  };

  return Promise.all([
    Promise.resolve(action),
    restoreSchedule(),
  ]);
}

function logInWithFacebook(source: ?string): ThunkAction {
  return (dispatch) => {
    const login = _logInWithFacebook(source);

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

function logOut(): ThunkAction {
  return (dispatch) => {
    Parse.User.logOut();
    dispatch(NavigationActions.navigate({
      routeName: 'home',
    }));
    // FacebookSDK.logout();
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

module.exports = { logInWithFacebook, signUp, skipLogin, logOut, logOutWithPrompt };