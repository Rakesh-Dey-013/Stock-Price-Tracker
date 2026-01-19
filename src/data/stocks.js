// Extended stock data with more details
// Extended stock data with more details - Updated Jan 19, 2026
export const stocks = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 255.53, // Updated
    change: -2.68,
    changePercent: -1.04,
    sector: 'Technology',
    exchange: 'NASDAQ',
    marketCap: 3760000000000, // Updated
    volume: 72142773,
    open: 257.90,
    previousClose: 258.21,
    dayHigh: 258.90,
    dayLow: 254.93
  },
  {
    id: 2,
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 459.86, // Updated
    change: 3.20,
    changePercent: 0.70,
    sector: 'Technology',
    exchange: 'NASDAQ',
    marketCap: 4030000000000, // Updated
    volume: 24500000,
    open: 457.10,
    previousClose: 456.66,
    dayHigh: 461.20,
    dayLow: 456.80
  },
  {
    id: 3,
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 330.00, // Updated
    change: -2.78,
    changePercent: -0.84,
    sector: 'Technology',
    exchange: 'NASDAQ',
    marketCap: 3620000000000, // Updated
    volume: 18200000,
    open: 332.45,
    previousClose: 332.78,
    dayHigh: 333.15,
    dayLow: 329.50
  },
  {
    id: 4,
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 239.12, // Updated
    change: 0.94,
    changePercent: 0.39,
    sector: 'Consumer Cyclical',
    exchange: 'NASDAQ',
    marketCap: 2340000000000, // Updated
    volume: 35000000,
    open: 238.50,
    previousClose: 238.18,
    dayHigh: 240.25,
    dayLow: 237.80
  },
  {
    id: 5,
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 186.23, // Updated
    change: -0.82,
    changePercent: -0.44,
    sector: 'Technology',
    exchange: 'NASDAQ',
    marketCap: 4350000000000, // Updated
    volume: 48000000,
    open: 187.40,
    previousClose: 187.05,
    dayHigh: 188.50,
    dayLow: 185.10
  },
  // New Additions
  {
    id: 6,
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 620.25, //
    change: -0.55,
    changePercent: -0.09,
    sector: 'Communication Services',
    exchange: 'NASDAQ',
    marketCap: 1900000000000, //
    volume: 15600000,
    open: 622.10,
    previousClose: 620.80,
    dayHigh: 625.30,
    dayLow: 618.40
  },
  {
    id: 7,
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 437.50, //
    change: -1.07,
    changePercent: -0.24,
    sector: 'Consumer Cyclical',
    exchange: 'NASDAQ',
    marketCap: 1400000000000, //
    volume: 85000000,
    open: 440.20,
    previousClose: 438.57,
    dayHigh: 442.80,
    dayLow: 435.15
  },
  {
    id: 8,
    symbol: 'AVGO',
    name: 'Broadcom Inc.',
    price: 351.71, //
    change: 8.69,
    changePercent: 2.53,
    sector: 'Technology',
    exchange: 'NASDAQ',
    marketCap: 1700000000000, //
    volume: 31000000,
    open: 345.20,
    previousClose: 343.02,
    dayHigh: 354.51,
    dayLow: 344.05
  },
  {
    id: 9,
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 312.47, //
    change: 3.21,
    changePercent: 1.04,
    sector: 'Financial Services',
    exchange: 'NYSE',
    marketCap: 895210000000, //
    volume: 12000000,
    open: 310.50,
    previousClose: 309.26,
    dayHigh: 313.80,
    dayLow: 309.40
  },
  {
    id: 10,
    symbol: 'V',
    name: 'Visa Inc.',
    price: 328.30, //
    change: 0.55,
    changePercent: 0.17,
    sector: 'Financial Services',
    exchange: 'NYSE',
    marketCap: 650000000000,
    volume: 6800000,
    open: 327.90,
    previousClose: 327.75,
    dayHigh: 329.50,
    dayLow: 326.80
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