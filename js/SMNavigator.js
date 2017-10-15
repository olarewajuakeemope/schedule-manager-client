'use strict';

import React, { Component } from 'react';
import {
  BackHandler,
  StyleSheet,
} from 'react-native';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import SMTabsView from './tabs/SMTabsView';

export const Navigator = StackNavigator({
  home: { screen: SMTabsView },
}, {
  navigationOptions: {
    tabBarVisible: false,
  },
  initialRouteName: 'home',
  headerMode: 'none',
});

class SMNavigator extends Component<{}> {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav
    });
    return (
      <Navigator navigation={navigation} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

function select(store) {
  return {
    tab: store.navigation.tab,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    nav: store.nav,
  };
}

export default connect(select)(SMNavigator);
