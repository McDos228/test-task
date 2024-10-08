const mockData = require('./mockData');
const fs = require('fs');
const fileName = 'favorites.txt';

async function getBinanceData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockData)
    }, 200);
  })
};

function mapResponse (symbol) {
  return {
    symbol: symbol.symbol,
    ask: symbol.price * 1.05,
    bid: symbol.price * 0.95
  }
}

async function addToFavorites (symbol) {
  try {
    if (!symbol) {
      throw new Error('Symbol is required');
    }
  
    fs.writeFileSync(fileName, symbol + '\n', { flag: 'a' });
  
    return true;
  } catch (error) {
    throw error;
  }
}

async function getFavorites() {
  return fs.readFileSync(fileName, 'utf8').split('\n').filter(Boolean);
}

module.exports = {
  getBinanceData,
  mapResponse,
  addToFavorites,
  getFavorites
}