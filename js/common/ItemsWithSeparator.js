/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  PixelRatio,
  StyleSheet,
  View,
} from 'react-native';

class ItemsWithSeparator extends Component {
  props: {
    style?: any;
    separatorStyle?: any;
    children?: any;
  };

  render() {
    var children = [];
    var length = React.Children.count(this.props.children);
    React.Children.forEach(
      this.props.children,
      (child, ii) => {
        children.push(child);
        if (ii !== length - 1) {
          children.push(
            <View
              key={'separator-' + ii}
              style={[styles.separator, this.props.separatorStyle]}
            />
          );
        }
      }
    );
    return (
      <View style={this.props.style}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#0322500A',
    height: 1 / PixelRatio.get(),
  },
});

module.exports = ItemsWithSeparator;
