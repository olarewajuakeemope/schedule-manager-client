/**
 * @providesModule SMSessionCell
 * @flow
 */

'use strict';

var SMColors = require('../../common/SMColors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('../../common/SMText');
var SMTouchable = require('../../common/SMTouchable');
var View = require('View');
var formatDuration = require('./formatDuration');
var formatTime = require('./formatTime');

var { connect } = require('react-redux');

import type {Session} from '../../reducers/sessions';

class SMSessionCell extends React.Component {
  props: {
    session: Session;
    showTick: boolean;
    showStartEndTime: boolean;
    onPress: ?() => void;
    style: any;
  };

  render() {
    var session = this.props.session;
    var tick;
    if (this.props.showTick) {
      tick =
        <Image style={styles.added} source={require('./img/added-cell.png')} />;
    }
    var time;
    if (this.props.showStartEndTime) {
      time = formatTime(session.startTime) + ' - ' + formatTime(session.endTime);
    } else {
      time = formatDuration(session.startTime, session.endTime);
    }
    var location = session.location && session.location.toUpperCase();
    var locationColor = SMColors.colorForLocation(location);
    var cell =
      <View style={[styles.cell, this.props.style]}>
        <View style={styles.titleSection}>
          <Text numberOfLines={2} style={styles.titleText}>
            {session.title}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.duration}>
          <Text style={[styles.locationText, {color: locationColor}]}>
            {location}
          </Text>
          {location && ' - '}
          {time}
        </Text>
        {tick}
      </View>;

    if (this.props.onPress) {
      cell =
        <SMTouchable onPress={this.props.onPress}>
          {cell}
        </SMTouchable>;
    }

    return cell;
  }
}


var styles = StyleSheet.create({
  cell: {
    paddingVertical: 15,
    paddingLeft: 17,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  titleSection: {
    paddingRight: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleAndDuration: {
    justifyContent: 'center',
  },
  titleText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    color: SMColors.darkText,
    marginBottom: 4,
    marginRight: 10,
  },
  duration: {
    fontSize: 12,
    color: SMColors.lightText,
  },
  locationText: {
    fontSize: 12,
  },
  added: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },
});

function select(store, props) {
  return {
    showTick: !!store.schedule[props.session.id],
  };
}

module.exports = connect(select)(SMSessionCell);
