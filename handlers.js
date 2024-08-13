const { getBinanceData, mapResponse, addToFavorites, getFavorites } = require('./service');

async function symbolListHandler (req, res) {
  const symbols = await getBinanceData()

  const priceList = [];

  const favorites = await getFavorites();

  const favoritesSet = new Set(favorites);

  const filteredSymbols = symbols.filter(symbol => favoritesSet.has(symbol.symbol));
  const otherSymbols = symbols.filter(symbol => !favoritesSet.has(symbol.symbol));

  for (let symbol of [...filteredSymbols, ...otherSymbols]) {
    priceList.push(mapResponse(symbol));
  }

  res.status(200).json(priceList);
}

async function addToFavoritesHandler (req, res) {
  const { symbol } = req.body;

  if (!symbol) {
    return res.status(400).json({ status: 'error', message: 'Symbol is required' });
  }

  await addToFavorites(symbol);  

  res.status(200).json({ status: 'success', message: 'Symbol added to favorites' });
}

async function getFavoritesHandler (req, res) {
  const favorites = getFavorites()

  res.json(favorites);
}

module.exports = {symbolListHandler, addToFavoritesHandler, getFavoritesHandler};