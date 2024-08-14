const { getBinanceData, mapResponse, addToFavorites, getFavorites } = require('./service');

async function symbolListHandler (req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

async function addToFavoritesHandler (req, res, next) {
  try {
    const { symbol } = req.body;
    await addToFavorites(symbol);

    res.status(200).json({ message: 'Symbol added to favorites' });
  } catch (error) {
    next(error);
  }
}

async function getFavoritesHandler (req, res, next) {
  try {
    const favorites = await getFavorites()

    res.json(favorites);
  } catch (error) {
    next(error);
  }
}

module.exports = {symbolListHandler, addToFavoritesHandler, getFavoritesHandler};