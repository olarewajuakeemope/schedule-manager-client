/**
 * @flow
 */
'use strict';

import { createSelector } from 'reselect';
import allNotifications from './allNotifications';

import type {Notification, SeenNotifications} from '../../reducers/notifications';

function unseenNotificationsCount(notifications: Array<Notification>, seen: SeenNotifications): number {
  return notifications.filter((notification) => !seen[notification.id]).length;
}

module.exports = createSelector(
  allNotifications,
  (store) => store.notifications.seen,
  unseenNotificationsCount,
);
