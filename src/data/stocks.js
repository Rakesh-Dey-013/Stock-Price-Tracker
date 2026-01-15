// Extended stock data with more details
export const stocks = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 176.08,
    change: 0.55,
    changePercent: 0.31,
    sector: 'Technology',
    exchange: 'NASDAQ',
    marketCap: 2760000000000,
    volume: 56000000,
    open: 175.50,
    previousClose: 175.53,
    dayHigh: 176.85,
    dayLow: 175.20
  },
  {
    id: 2,
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 407.81,
    change: 2.37,
    changePercent: 0.58,
    sector: 'Technology',
    exchange: 'NASDAQ',
    marketCap: 3030000000000,
    volume: 22000000,
    open: 405.25,
    previousClose: 405.44,
    dayHigh: 408.90,
    dayLow: 404.75
  },
  {
    id: 3,
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 171.11,
    change: -0.42,
    changePercent: -0.24,
    sector: 'Technology',
    exchange: 'NASDAQ',
    marketCap: 2150000000000,
    volume: 18000000,
    open: 171.80,
    previousClose: 171.53,
    dayHigh: 172.45,
    dayLow: 170.25
  },
  {
    id: 4,
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.22,
    change: 1.35,
    changePercent: 0.76,
    sector: 'Consumer Cyclical',
    exchange: 'NASDAQ',
    marketCap: 1830000000000,
    volume: 32000000,
    open: 176.50,
    previousClose: 176.87,
    dayHigh: 179.05,
    dayLow: 176.10
  },
  {
    id: 5,
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 502.30,
    change: 4.72,
    changePercent: 0.95,
    sector: 'Communication Services',
    exchange: 'NASDAQ',
    marketCap: 1280000000000,
    volume: 15000000,
    open: 498.25,
    previousClose: 497.58,
    dayHigh: 504.80,
    dayLow: 496.75
  },
  {
    id: 6,
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 168.29,
    change: -2.11,
    changePercent: -1.24,
    sector: 'Automotive',
    exchange: 'NASDAQ',
    marketCap: 536000000000,
    volume: 78000000,
    open: 170.50,
    previousClose: 170.40,
    dayHigh: 171.25,
    dayLow: 167.10
  }
];

// Generate historical price data for charts
export const getStockHistory = (symbol, timeRange = '1W') => {
  const basePrice = stocks.find(s => s.symbol === symbol)?.price || 100;
  const dataPoints = timeRange === '1D' ? 24 : 
                    timeRange === '1W' ? 7 : 
                    timeRange === '1M' ? 30 : 
                    timeRange === '3M' ? 90 : 365;
  
  const volatility = 0.02; // 2% daily volatility
  const results = [];
  let currentPrice = basePrice;
  
  // Generate dates based on time range
  const endDate = new Date();
  const startDate = new Date();
  
  if (timeRange === '1D') {
    startDate.setHours(endDate.getHours() - 24);
  } else {
    startDate.setDate(endDate.getDate() - dataPoints);
  }
  
  for (let i = 0; i < dataPoints; i++) {
    // Calculate date
    const date = new Date(startDate);
    if (timeRange === '1D') {
      date.setHours(startDate.getHours() + i);
    } else {
      date.setDate(startDate.getDate() + i);
    }
    
    // Format date based on time range
    let dateLabel;
    if (timeRange === '1D') {
      dateLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      dateLabel = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    // Simulate price movement
    const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
    currentPrice += change;
    
    results.push({
      date: dateLabel,
      price: currentPrice
    });
  }
  
  return results;
};