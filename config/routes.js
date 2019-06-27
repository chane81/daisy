const nextRoutes = require('next-routes');
const routes = (module.exports = nextRoutes());

routes.add('popular-tracks', '(/|/popular-tracks)');
routes.add('channel-list', '/channel-list');
routes.add('channel-playlist', '/channel-playlist/:id');