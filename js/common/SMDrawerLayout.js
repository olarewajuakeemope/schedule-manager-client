
/**
 * @flow
 * @providesModule SMDrawerLayout
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
var DrawerLayoutAndroid = require('DrawerLayoutAndroid');

class SMDrawerLayout extends Component {
  _drawer: ?DrawerLayoutAndroid;

  constructor(props: any, context: any) {
    super(props, context);

    (this: any).openDrawer = this.openDrawer.bind(this);
    (this: any).closeDrawer = this.closeDrawer.bind(this);
    (this: any).onDrawerOpen = this.onDrawerOpen.bind(this);
    (this: any).onDrawerClose = this.onDrawerClose.bind(this);
    (this: any).handleBackButton = this.handleBackButton.bind(this);
  }

  render() {
    const {drawerPosition, ...props} = this.props;
    const {Right, Left} = DrawerLayoutAndroid.positions;
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this._drawer = drawer; }}
        {...props}
        drawerPosition={drawerPosition === 'right' ? Right : Left}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose}
      />
    );
  }

  componentWillUnmount() {
    this.context.removeBackButtonListener(this.handleBackButton);
    this._drawer = null;
  }

  handleBackButton(): boolean {
    this.closeDrawer();
    return true;
  }

  onDrawerOpen() {
    this.context.addBackButtonListener(this.handleBackButton);
    this.props.onDrawerOpen && this.props.onDrawerOpen();
  }

  onDrawerClose() {
    this.context.removeBackButtonListener(this.handleBackButton);
    this.props.onDrawerClose && this.props.onDrawerClose();
  }

  closeDrawer() {
    this._drawer && this._drawer.closeDrawer();
  }

  openDrawer() {
    this._drawer && this._drawer.openDrawer();
  }
}

SMDrawerLayout.contextTypes = {
  addBackButtonListener: PropTypes.func,
  removeBackButtonListener: PropTypes.func,
};

module.exports = SMDrawerLayout;
