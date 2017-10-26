/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import SMColors from '../../common/SMColors';
import SMSessionCell from '../schedule/SMSessionCell';
import findSessionByURI from './findSessionByURI';
import { Text } from '../../common/SMText';


class NotificationCell extends Component {
  render() {
    var attachment;
    if (this.props.session) {
      attachment = (
        <SMSessionCell
          style={styles.session}
          session={this.props.session}
          showStartEndTime={true}
        />
      );
    } else if (this.props.notification.url) {
      attachment = <Text style={styles.url}>{this.props.notification.url}</Text>;
    }
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={[styles.cell, !this.props.isSeen && styles.unseen]}>
          <Text style={styles.text}>
            {this.props.notification.text}
          </Text>
          {attachment}
          <View style={styles.footer}>
            <Text style={styles.time}>
              {moment(this.props.notification.time).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  cell: {
    padding: 15,
    backgroundColor: 'white',
  },
  unseen: {
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#4D99EF',
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  session: {
    paddingVertical: undefined,
    paddingHorizontal: undefined,
    paddingLeft: undefined,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: SMColors.cellBorder,
    // overflow: 'hidden',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#eee',
    shadowOpacity: 1,
  },
  footer: {
    flexDirection: 'row',
  },
  url: {
    flex: 1,
    color: SMColors.actionText,
    fontSize: 12,
    marginBottom: 10,
  },
  time: {
    color: SMColors.lightText,
    fontSize: 12,
  },
});

function select(store, props) {
  return {
    session: findSessionByURI(store.sessions, props.notification.url),
    isSeen: store.notifications.seen[props.notification.id],
  };
}

module.exports = connect(select)(NotificationCell);
