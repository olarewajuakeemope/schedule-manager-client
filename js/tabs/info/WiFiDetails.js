/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Clipboard,
  ToastAndroid,
  Platform,
} from 'react-native';
import SMButton from '../../common/SMButton';
import ItemsWithSeparator from '../../common/ItemsWithSeparator';
import Section from './Section';
import { Text } from '../../common/SMText';
import SMColors from '../../common/SMColors';

type Props = {
  network: string;
  password: string;
};

type State = {
  copied: boolean;
};

class WiFiDetails extends Component {
  props: Props;
  state: State = {
    copied: false,
  };

  render() {
    const caption = this.state.copied
      ? 'Copied!'
      : 'Copy password';
    return (
      <Section title="WiFi" style={styles.container}>
        <ItemsWithSeparator>
          <Row label="Network" value={this.props.network} />
          <Row label="Password" value={this.props.password} />
        </ItemsWithSeparator>
        <SMButton
          style={styles.button}
          onPress={this.handleCopy.bind(this)}
          caption={caption}
        />
      </Section>
    );
  }

  handleCopy() {
    Clipboard.setString(this.props.password);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Copied!', ToastAndroid.SHORT);
    } else {
      this.setState({copied: true});
      setTimeout(() => this.setState({copied: false}), 800);
    }
  }
}

class Row extends React.Component {
  props: {
    label: string;
    value: string;
  };

  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>
          {this.props.label.toUpperCase()}
        </Text>
        <Text style={styles.value}>
          {this.props.value}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    color: SMColors.lightText,
  },
  value: {
    fontSize: 15,
    color: '#002350',
  },
  button: {
    marginTop: 25,
    marginHorizontal: 20,
  },
});
module.exports = WiFiDetails;
