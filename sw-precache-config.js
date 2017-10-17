module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/*.html',
    'build/*.png',
    'build/manifest.json',
    'build/static/**/!(*map*)',
  ],
  swFilePath: 'build/service-worker.js',
};
