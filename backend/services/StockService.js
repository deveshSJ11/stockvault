const axios = require('axios');

// Popular stock symbols to track
const STOCK_SYMBOLS = [
  'AAPL',   // Apple
  'GOOGL',  // Google
  'MSFT',   // Microsoft
  'AMZN',   // Amazon
  'TSLA',   // Tesla
  'META',   // Meta
  'NVDA',   // Nvidia
  'JPM',    // JP Morgan
  'V',      // Visa
  'WMT'     // Walmart
];

// Fallback dummy data when API fails
const FALLBACK_DATA = {
  'AAPL': { symbol: 'AAPL', regularMarketPrice: 178.50, regularMarketPreviousClose: 175.20, shortName: 'Apple Inc.' },
  'GOOGL': { symbol: 'GOOGL', regularMarketPrice: 142.30, regularMarketPreviousClose: 140.15, shortName: 'Alphabet Inc.' },
  'MSFT': { symbol: 'MSFT', regularMarketPrice: 420.50, regularMarketPreviousClose: 418.20, shortName: 'Microsoft Corporation' },
  'AMZN': { symbol: 'AMZN', regularMarketPrice: 178.90, regularMarketPreviousClose: 176.40, shortName: 'Amazon.com Inc.' },
  'TSLA': { symbol: 'TSLA', regularMarketPrice: 248.30, regularMarketPreviousClose: 245.10, shortName: 'Tesla Inc.' },
  'META': { symbol: 'META', regularMarketPrice: 515.60, regularMarketPreviousClose: 510.20, shortName: 'Meta Platforms Inc.' },
  'NVDA': { symbol: 'NVDA', regularMarketPrice: 875.40, regularMarketPreviousClose: 868.50, shortName: 'NVIDIA Corporation' },
  'JPM': { symbol: 'JPM', regularMarketPrice: 198.70, regularMarketPreviousClose: 196.30, shortName: 'JPMorgan Chase & Co.' },
  'V': { symbol: 'V', regularMarketPrice: 285.20, regularMarketPreviousClose: 282.80, shortName: 'Visa Inc.' },
  'WMT': { symbol: 'WMT', regularMarketPrice: 165.30, regularMarketPreviousClose: 163.90, shortName: 'Walmart Inc.' }
};

// Fetch live stock data from RapidAPI
async function fetchLiveStockData(symbol) {
  const options = {
    method: 'GET',
    url: 'https://live-stock-market.p.rapidapi.com/v1/stock/quote',
    params: { symbol },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': process.env.RAPIDAPI_HOST || 'live-stock-market.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error.message);
    
    // Return fallback data instead of null
    console.log(`Using fallback data for ${symbol}`);
    return FALLBACK_DATA[symbol] || null;
  }
}

// Transform API data to match Holdings schema
function transformToHolding(stockData) {
  if (!stockData) return null;

  const currentPrice = stockData.regularMarketPrice || 0;
  const previousClose = stockData.regularMarketPreviousClose || currentPrice;
  const changePercent = ((currentPrice - previousClose) / previousClose * 100).toFixed(2);
  const dayChange = (currentPrice - previousClose).toFixed(2);

  return {
    name: stockData.symbol || 'N/A',
    qty: Math.floor(Math.random() * 50) + 10,
    avg: previousClose,
    price: currentPrice,
    net: changePercent > 0 ? `+${changePercent}%` : `${changePercent}%`,
    day: dayChange > 0 ? `+${dayChange}` : `${dayChange}`
  };
}

// Transform API data to match Positions schema
function transformToPosition(stockData) {
  if (!stockData) return null;

  const currentPrice = stockData.regularMarketPrice || 0;
  const previousClose = stockData.regularMarketPreviousClose || currentPrice;
  const qty = Math.floor(Math.random() * 30) + 5;
  const avgPrice = previousClose * (0.95 + Math.random() * 0.1);
  const dayChange = ((currentPrice - previousClose) / previousClose * 100).toFixed(2);
  const profitLoss = ((currentPrice - avgPrice) * qty).toFixed(2);
  const profitLossPercent = ((currentPrice - avgPrice) / avgPrice * 100).toFixed(2);

  return {
    product: stockData.symbol || 'N/A',
    name: stockData.shortName || stockData.symbol,
    qty: qty,
    avg: parseFloat(avgPrice.toFixed(2)),
    price: currentPrice,
    net: profitLossPercent > 0 ? `+${profitLossPercent}%` : `${profitLossPercent}%`,
    day: dayChange > 0 ? `+${dayChange}%` : `${dayChange}%`,
    isLoss: parseFloat(profitLoss) < 0
  };
}

// Get all holdings with live data
async function getLiveHoldings() {
  try {
    const promises = STOCK_SYMBOLS.map(symbol => fetchLiveStockData(symbol));
    const results = await Promise.all(promises);
    
    const holdings = results
      .map(transformToHolding)
      .filter(holding => holding !== null);

    return holdings;
  } catch (error) {
    console.error('Error getting live holdings:', error);
    return [];
  }
}

// Get all positions with live data
async function getLivePositions() {
  try {
    const promises = STOCK_SYMBOLS.slice(0, 5).map(symbol => fetchLiveStockData(symbol));
    const results = await Promise.all(promises);
    
    const positions = results
      .map(transformToPosition)
      .filter(position => position !== null);

    return positions;
  } catch (error) {
    console.error('Error getting live positions:', error);
    return [];
  }
}

// Search for stocks
async function searchStock(query) {
  const options = {
    method: 'GET',
    url: 'https://live-stock-market.p.rapidapi.com/v1/stock/search',
    params: { query },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': process.env.RAPIDAPI_HOST || 'live-stock-market.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error searching stocks:', error.message);
    return [];
  }
}

module.exports = {
  getLiveHoldings,
  getLivePositions,
  searchStock,
  fetchLiveStockData
};