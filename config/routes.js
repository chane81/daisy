/**
 * @typedef { import("next-routes").Registry } Registry}
 */
const nextRoutes = require('next-routes');

/**
 * @type {Registry}
 */
(module.exports = nextRoutes())
.add({name: '/', page: '/popular-tracks', pattern: '/'})
.add('popular-tracks', '/popular-tracks')
.add('channel-list', '/channel-list')
.add('channel-playlist','/channel-playlist/:channelId');
  