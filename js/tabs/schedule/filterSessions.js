/**
 * @flow
 */
'use strict';

import type {Session} from '../../reducers/sessions';

type StringMap = {[key: string]: boolean};

function byDay(sessions: Array<Session>, day: number): Array<Session> {
  return sessions.filter((session) => session.day === day);
}

function byTopics(sessions: Array<Session>, topics: StringMap): Array<Session> {
  if (Object.keys(topics).length === 0) {
    return sessions;
  }
  return sessions.filter((session) => {
    var hasMatchingTag = false;
    session.tags.forEach((tag) => {
      hasMatchingTag = hasMatchingTag || topics[tag];
    });
    return hasMatchingTag;
  });
}

function bySchedule(sessions: Array<Session>, schedule: StringMap): Array<Session> {
  return sessions.filter(
    (session) => schedule[session.id]
  );
}

module.exports = {byDay, byTopics, bySchedule};
