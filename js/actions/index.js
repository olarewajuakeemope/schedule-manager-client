/**
 * @flow
 */

'use strict';

const parseActions = require('./parse');
const navigationActions = require('./navigation');
const userActions = require('./user');
const loginActions = require('./login');
const scheduleActions = require('./schedule');
const filterActions = require('./filter');
const notificationActions = require('./notifications');
const configActions = require('./config');
const surveyActions = require('./surveys');
const testActions = require('./test');
const installationActions = require('./installation');

module.exports = {
  ...userActions,
  ...loginActions,
  ...scheduleActions,
  ...filterActions,
  ...notificationActions,
  ...configActions,
  ...surveyActions,
  ...testActions,
  ...parseActions,
  ...navigationActions,
  ...installationActions,
};
