const express = require('express')
const { symbolListHandler, addToFavoritesHandler, getFavoritesHandler } = require('./handlers');

const routes = express.Router()

routes.get('/symbols', symbolListHandler);
routes.post('/favorites', addToFavoritesHandler);
routes.get('/favorites', getFavoritesHandler);

module.exports = routes