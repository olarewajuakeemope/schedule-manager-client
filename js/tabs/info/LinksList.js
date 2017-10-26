/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  Image,
  Linking,
  StyleSheet,
} from 'react-native';
import SMColors from '../../common/SMColors';
import ItemsWithSeparator from '../../common/ItemsWithSeparator';
import Section from './Section';
import SMTouchable from '../../common/SMTouchable';
import { Text } from '../../common/SMText';

class LinksList extends React.Component {
  props: {
    title: string;
    links: Array<{
      logo?: ?string;
      title: string;
      url?: string;
      onPress?: () => void;
    }>;
  };

  render() {
    let content = this.props.links.map(
      (link) => <Row link={link} key={link.title} />
    );
    return (
      <Section title={this.props.title}>
        <ItemsWithSeparator separatorStyle={styles.separator}>
          {content}
        </ItemsWithSeparator>
      </Section>
    );
  }
}

class Row extends Component {
  props: {
    link: {
      logo: ?string;
      title: string;
      url?: string;
      onPress?: () => void;
    };
  };

  render() {
    var {logo, title} = this.props.link;
    var image = logo && <Image style={styles.picture} source={{uri: logo}} />;
    return (
      <SMTouchable onPress={this.handlePress.bind(this)}>
        <View style={styles.row}>
          {image}
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Image source={require('../../common/img/disclosure.png')} />
        </View>
      </SMTouchable>
    );
  }

  handlePress() {
    var {url, onPress} = this.props.link;
    if (onPress) {
      onPress();
    }
    if (url) {
      Linking.openURL(url);
    }
  }
}

const IMAGE_SIZE = 44;

var styles = StyleSheet.create({
  separator: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    height: 60,
  },
  picture: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    marginRight: 16,
  },
  title: {
    fontSize: 17,
    color: SMColors.darkText,
    flex: 1,
  },
  button: {
    padding: 10,
  },
  like: {
    letterSpacing: 1,
    color: SMColors.actionText,
    fontSize: 12,
  },
});

module.exports = LinksList;
