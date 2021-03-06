/**
 * @flow
 */
'use strict';

import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import SMColors from '../common/SMColors';

import type {Session} from '../reducers/sessions';

type Props = {
  session: Session;
};

function Header({session}: Props) {
  const pics = session.speakers.map((speaker) => (
    <Image
      key={speaker.id}
      source={{uri: speaker.pic}}
      style={styles.pic}
    />
  ));
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={require('./img/header.png')} />
      </View>
      <Text style={styles.title}>
        {session.title}
      </Text>
      <View style={styles.speakers}>
        {pics}
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
    paddingHorizontal: 10,
  },
  background: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  label: {
    fontSize: 12,
    color: SMColors.lightText,
    letterSpacing: 1,
  },
  title: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: SMColors.darkText,
    textAlign: 'center',
  },
  speakers: {
    marginTop: 15,
    flexDirection: 'row',
  },
  pic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 2,
  },
});

module.exports = Header;
module.exports.__cards__ = (define) => {
  const MOCK_SESSION = {
    id: 'mock1',
    title: 'Building For the Next Billion',
    speakers: [
      {
        id: '1',
        bio: '',
        name: 'Foo',
        title: '',
        pic: 'https://graph.facebook.com/100001244322535/picture?width=60&height=60',
      },
      {
        id: '2',
        bio: '',
        name: 'Bar',
        title: '',
        pic: 'https://graph.facebook.com/10152531777042364/picture?width=60&height=60',
      },
    ],
    day: 1,
    allDay: false,
    description: '...',
    startTime: 0,
    endTime: 0,
    hasDetails: true,
    location: 'space',
    map: 'space',
    onMySchedule: false,
    slug: 'next-billion',
    tags: [],
  };

  define('Example', (state = null, update) => (
    <Header session={MOCK_SESSION} />
  ));

  define('Long title', () => (
    <Header session={{
      ...MOCK_SESSION,
      title: 'Inside Facebook\'s Infrastructure (Part 1): The System that Serves Billions',
      speakers: [],
    }} />
  ));
};
