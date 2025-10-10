const axios = require('axios');

// Popular stock symbols to track
const STOCK_SYMBOLS = [
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA',
  'META', 'NVDA', 'JPM', 'V', 'WMT'
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

// Validate API credentials
function validateApiCredentials() {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey) {
    console.warn('⚠️  WARNING: RAPIDAPI_KEY is not set! Using fallback data only.');
    return false;
  }

  if (!apiHost) {
    console.warn('⚠️  WARNING: RAPIDAPI_HOST is not set! Using default host.');
  }

  console.log('✓ API credentials validated');
  return true;
}

// Fetch live stock data from RapidAPI
async function fetchLiveStockData(symbol) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST || 'live-stock-market.p.rapidapi.com';

  // If no API key, use fallback immediately
  if (!apiKey) {
    console.log(`📦 Using fallback data for ${symbol} (no API key)`);
    return FALLBACK_DATA[symbol] || null;
  }

  const options = {
    method: 'GET',
    url: 'https://live-stock-market.p.rapidapi.com/v1/stock/quote',
    params: { symbol },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    },
    timeout: 10000 // 10 second timeout
  };

  try {
    console.log(`🔄 Fetching live data for ${symbol}...`);
    const response = await axios.request(options);
    console.log(`✓ Fetched data for ${symbol}`);
    return response.data;
  } catch (error) {
    console.error(`❌ API Error for ${symbol}:`, {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText
    });

    // Check if it's an auth error
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error('🔑 Authentication Error! Check your RAPIDAPI_KEY and RAPIDAPI_HOST');
    }

    // Use fallback data
    console.log(`📦 Using fallback data for ${symbol}`);
    return FALLBACK_DATA[symbol] || null;
  }
}

// Transform API data to match Holdings schema
function transformToHolding(stockData) {
  if (!stockData) return null;

  const currentPrice = stockData.regularMarketPrice || 0;
  const previousClose = stockData.regularMarketPreviousClose || currentPrice;
  const changePercent = previousClose !== 0 
    ? ((currentPrice - previousClose) / previousClose * 100).toFixed(2)
    : '0.00';
  const dayChange = (currentPrice - previousClose).toFixed(2);

  return {
    name: stockData.symbol || 'N/A',
    qty: Math.floor(Math.random() * 50) + 10,
    avg: parseFloat(previousClose.toFixed(2)),
    price: parseFloat(currentPrice.toFixed(2)),
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
  const dayChange = previousClose !== 0
    ? ((currentPrice - previousClose) / previousClose * 100).toFixed(2)
    : '0.00';
  const profitLoss = ((currentPrice - avgPrice) * qty).toFixed(2);
  const profitLossPercent = avgPrice !== 0
    ? ((currentPrice - avgPrice) / avgPrice * 100).toFixed(2)
    : '0.00';

  return {
    product: stockData.symbol || 'N/A',
    name: stockData.shortName || stockData.symbol,
    qty: qty,
    avg: parseFloat(avgPrice.toFixed(2)),
    price: parseFloat(currentPrice.toFixed(2)),
    net: profitLossPercent > 0 ? `+${profitLossPercent}%` : `${profitLossPercent}%`,
    day: dayChange > 0 ? `+${dayChange}%` : `${dayChange}%`,
    isLoss: parseFloat(profitLoss) < 0
  };
}

// Get all holdings with live data
async function getLiveHoldings() {
  try {
    console.log('📊 Fetching holdings for', STOCK_SYMBOLS.length, 'stocks...');
    const promises = STOCK_SYMBOLS.map(symbol => fetchLiveStockData(symbol));
    const results = await Promise.all(promises);

    const holdings = results
      .map(transformToHolding)
      .filter(holding => holding !== null);

    console.log(`✓ Retrieved ${holdings.length} holdings`);
    return holdings;
  } catch (error) {
    console.error('❌ Error getting live holdings:', error.message);
    return [];
  }
}

// Get all positions with live data
async function getLivePositions() {
  try {
    console.log('📊 Fetching positions for top 5 stocks...');
    const promises = STOCK_SYMBOLS.slice(0, 5).map(symbol => fetchLiveStockData(symbol));
    const results = await Promise.all(promises);

    const positions = results
      .map(transformToPosition)
      .filter(position => position !== null);

    console.log(`✓ Retrieved ${positions.length} positions`);
    return positions;
  } catch (error) {
    console.error('❌ Error getting live positions:', error.message);
    return [];
  }
}

// Search for stocks
async function searchStock(query) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST || 'live-stock-market.p.rapidapi.com';

  if (!apiKey) {
    console.warn('⚠️  Cannot search stocks - no API key provided');
    return [];
  }

  const options = {
    method: 'GET',
    url: 'https://live-stock-market.p.rapidapi.com/v1/stock/search',
    params: { query },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    },
    timeout: 10000
  };

  try {
    console.log(`🔍 Searching stocks for: ${query}`);
    const response = await axios.request(options);
    console.log(`✓ Found ${response.data.length || 0} results for "${query}"`);
    return response.data;
  } catch (error) {
    console.error('❌ Error searching stocks:', error.message);
    return [];
  }
}

// Call this on startup
validateApiCredentials();

module.exports = {
  getLiveHoldings,
  getLivePositions,
  searchStock,
  fetchLiveStockData
};