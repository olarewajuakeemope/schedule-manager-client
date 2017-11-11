/**
 * @providesModule SMMapView
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
  Platform,
  View,
  ActionSheetIOS,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import SMButton from '../../common/SMButton';
import PureListView from '../../common/PureListView';
import ListContainer from '../../common/ListContainer';
import MapView from '../../common/MapView';

const StyleSheet = require('../../common/SMStyleSheet');

const VENUE_ADDRESS = '2 Marina Blvd, San Francisco, CA 94123';

class SMMapView extends Component {
  constructor() {
    super();

    (this: any).handleGetDirections = this.handleGetDirections.bind(this);
    (this: any).openMaps = this.openMaps.bind(this);
  }

  render() {
    const {map1, map2} = this.props;

    return (
      <View style={styles.container}>
        <ListContainer
          title="Maps"
          backgroundImage={require('./img/maps-background.png')}
          backgroundColor={'#9176D2'}>
          <PureListView
            title="Overview"
            renderEmptyList={() => <MapView map={map1} />}
          />
          <PureListView
            title="Developer Garage"
            renderEmptyList={() => <MapView map={map2} />}
          />
        </ListContainer>
        <SMButton
          type="secondary"
          icon={require('./img/directions.png')}
          caption="Directions to Fort Mason Center"
          onPress={this.handleGetDirections}
          style={styles.directionsButton}
        />
      </View>
    );
  }

  handleGetDirections() {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: VENUE_ADDRESS,
          options: ['Open in Apple Maps', 'Open in Google Maps', 'Cancel'],
          destructiveButtonIndex: -1,
          cancelButtonIndex: 2,
        },
        this.openMaps
      );
    } else if (Platform.OS === 'android') {
      var address = encodeURIComponent(VENUE_ADDRESS);
      Linking.openURL('http://maps.google.com/maps?&q=' + address);
    }
  }

  openMaps(option) {
    var address = encodeURIComponent(VENUE_ADDRESS);
    switch (option) {
      case 0:
        Linking.openURL('http://maps.apple.com/?q=' + address);
        break;

      case 1:
        var nativeGoogleUrl = 'comgooglemaps-x-callback://?q=' +
          address + '&x-success=sm://&x-source=SM';
        Linking.canOpenURL(nativeGoogleUrl).then((supported) => {
          var url = supported ? nativeGoogleUrl : 'http://maps.google.com/?q=' + address;
          Linking.openURL(url);
        });
        break;
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  directionsButton: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    ios: {
      bottom: 49,
    },
    android: {
      bottom: 0,
    },
  },
});

function select(store) {
  return {
    map1: store.maps.find((map) => map.name === 'Overview'),
    map2: store.maps.find((map) => map.name === 'Developer Garage'),
  };
}

module.exports = connect(select)(SMMapView);
