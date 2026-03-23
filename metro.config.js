const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  // Manually point to the correct React entry point
  '@apollo/client': path.resolve(__dirname, 'node_modules/@apollo/client'),
};

// Enable these to help with subpath resolution
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = ['browser', 'require', 'react-native'];

// Ensure .cjs is included as Apollo 3.8+ uses it heavily
if (!config.resolver.sourceExts.includes('cjs')) {
  config.resolver.sourceExts.push('cjs');
}

module.exports = config;