/**
 * @flow
 */

'use strict';
import Parse from 'parse/react-native';
import { loadSessions } from './parse';

async function _createSchedule(details) {
  const {
    day,
    allDay,
    title,
    description,
    slug,
    speakers,
    tags,
    startTime,
    endTime,
    map,
    location
  } = details;
  const session = await new Parse.Object('Agenda');
  session.set('day', day);
  session.set('allDay', allDay);
  session.set('sessionTitle', title);
  session.set('sessionDescription', description);
  session.set('hasDetails', true);
  session.set('sessionSlug', slug);
  session.set('speakers', []);
  session.set('onMySchedule', true);
  session.set('tags', ['tag1', 'tag2']);
  session.set('startTime', new Date(startTime));
  session.set('endTime', new Date(endTime));
  session.set('sessionMap', map);
  session.set('sessionLocation', location);
  await session.save();

  return Promise.all([
    Promise.resolve(),
    loadSessions(),
  ]);
}

function createSchedule(session: ?Object): ThunkAction {
  return (dispatch) => {
    const schedule = _createSchedule(session);

    // Loading friends schedules shouldn't block the login process
    schedule.then(
      (result) => {
        dispatch(result);
      }
     );
    return schedule;
  };
}

module.exports = { createSchedule };
