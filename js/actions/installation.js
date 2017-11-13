/**
 * @flow
 */

'use strict';

const Platform = require('Platform');
const Parse = require('parse/react-native');

async function currentInstallation(): Promise<Parse.Installation> {
  const installationId = await Parse._getInstallationId();
  return new Parse.Installation({
    installationId,
    appName: 'Schedule Manager',
    deviceType: Platform.OS,
    // TODO: Get this information from the app itself
    appIdentifier: Platform.OS === 'ios' ? 'com.opeyemi.SM' : 'com.opeyemi.SM',
  });
}

async function updateInstallation(updates: Object = {}): Promise<void> {
  const installation = await currentInstallation();
  await installation.save(updates);
}

module.exports = { currentInstallation, updateInstallation };
