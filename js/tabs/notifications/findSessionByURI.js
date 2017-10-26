/**
 * @providesModule findSessionByURI
 * @flow
 */
'use strict';

import type { Session } from '../../reducers/sessions';

function findSessionByURI(sessions: Array<Session>, uri: ?string): ?Session {
  if (!uri) {
    return null;
  }
  var slug = uri.replace('f8://', '');
  for (var i = 0; i < sessions.length; i++) {
    var session = sessions[i];
    if (session.slug === slug || session.id === slug) {
      return session;
    }
  }
  return null;
}

module.exports = findSessionByURI;
