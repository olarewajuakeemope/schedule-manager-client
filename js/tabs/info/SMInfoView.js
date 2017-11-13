/**
 * @providesModule SMInfoView
 * @flow
 */

'use strict';

import React from 'react';
import { View } from 'react-native';
import Relay from 'react-relay/classic';
import CommonQuestions from './CommonQuestions';
import LinksList from './LinksList';
import ListContainer from '../../common/ListContainer';
import PureListView from '../../common/PureListView';
import WiFiDetails from './WiFiDetails';


const POLICIES_LINKS = [{
  title: 'Document Manager',
  url: 'https://github.com/olarewajuakeemope/document-manager.',
}, {
  title: 'News Flash',
  url: ' https://github.com/olarewajuakeemope/news-flash',
}, {
  title: 'Libary Manager',
  url: 'https://github.com/olarewajuakeemope/bc-library-application',
}];

function SMInfoView() {
  return (
    <ListContainer
      title="Information"
      backgroundImage={require('./img/info-background.png')}
      backgroundColor={'#47BFBF'}>
      <InfoList />
    </ListContainer>
  );
}

function InfoList({viewer: {config, faqs, pages}, ...props}) {
  return (
    <PureListView
      renderEmptyList={() => (
        <View>
          <WiFiDetails
            network={config.wifiNetwork}
            password={config.wifiPassword}
          />
          <CommonQuestions faqs={faqs} />
          <LinksList title="Github Page" links={pages} />
          <LinksList title="Related Projects" links={POLICIES_LINKS} />
        </View>
      )}
      {...(props: any /* flow can't guarantee the shape of props */)}
    />
  );
}

InfoList = Relay.createContainer(InfoList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        config {
          wifiNetwork
          wifiPassword
        }
        faqs {
          question
          answer
        }
        pages {
          title
          url
          logo
        }
      }
    `,
  },
});

module.exports = SMInfoView;
