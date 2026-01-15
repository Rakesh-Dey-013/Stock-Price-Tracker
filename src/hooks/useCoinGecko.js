import { useState, useEffect } from 'react';
import axios from 'axios';

// Mock data for fallback when API fails
const mockCoinsData = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 57420,
    price_change_percentage_24h: 2.5,
    price_change_percentage_7d_in_currency: 5.3,
    market_cap: 1100000000000,
    total_volume: 30000000000
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 3250,
    price_change_percentage_24h: 1.8,
    price_change_percentage_7d_in_currency: 4.2,
    market_cap: 390000000000,
    total_volume: 15000000000
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'Binance Coin',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    current_price: 520,
    price_change_percentage_24h: 3.2,
    price_change_percentage_7d_in_currency: 7.1,
    market_cap: 85000000000,
    total_volume: 2000000000
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 0.58,
    price_change_percentage_24h: -1.2,
    price_change_percentage_7d_in_currency: 0.8,
    market_cap: 32000000000,
    total_volume: 1500000000
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    current_price: 0.45,
    price_change_percentage_24h: 0.5,
    price_change_percentage_7d_in_currency: 2.1,
    market_cap: 16000000000,
    total_volume: 500000000
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 125,
    price_change_percentage_24h: 4.8,
    price_change_percentage_7d_in_currency: 12.3,
    market_cap: 55000000000,
    total_volume: 3000000000
  }
];

const mockTrendingData = {
  coins: [
    {
      item: {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        thumb: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
        price_btc: 1
      }
    },
    {
      item: {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'eth',
        thumb: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
        price_btc: 0.062
      }
    },
    {
      item: {
        id: 'shiba-inu',
        name: 'Shiba Inu',
        symbol: 'shib',
        thumb: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png',
        price_btc: 0.0000000012
      }
    },
    {
      item: {
        id: 'dogecoin',
        name: 'Dogecoin',
        symbol: 'doge',
        thumb: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
        price_btc: 0.0000023
      }
    },
    {
      item: {
        id: 'pepe',
        name: 'Pepe',
        symbol: 'pepe',
        thumb: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg',
        price_btc: 0.00000000045
      }
    },
    {
      item: {
        id: 'chainlink',
        name: 'Chainlink',
        symbol: 'link',
        thumb: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
        price_btc: 0.00078
      }
    }
  ]
};

// Mock data for coin details
const mockCoinDetails = {
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image: {
    large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    small: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    thumb: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
  },
  market_data: {
    current_price: {
      usd: 57420,
      inr: 57420 * 83.5
    },
    price_change_percentage_24h: 2.5,
    price_change_percentage_7d: 5.3,
    price_change_percentage_30d: 12.4,
    price_change_24h_in_currency: {
      usd: 1400,
      inr: 1400 * 83.5
    },
    market_cap: {
      usd: 1100000000000,
      inr: 1100000000000 * 83.5
    },
    total_volume: {
      usd: 30000000000,
      inr: 30000000000 * 83.5
    },
    circulating_supply: 19600000,
    total_supply: 21000000,
    ath: {
      usd: 69000,
      inr: 69000 * 83.5
    }
  },
  description: {
    en: "Bitcoin is the first decentralized cryptocurrency. Nodes in the peer-to-peer bitcoin network verify transactions through cryptography and record them in a public distributed ledger called a blockchain."
  }
};

// Mock data for market chart
const mockMarketData = {
  prices: Array.from({ length: 30 }, (_, i) => [
    Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
    50000 + Math.random() * 10000
  ])
};

const useCoinGecko = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Use your actual API key
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/${endpoint}`,
          { 
            params,
            headers: {
              'x-cg-demo-api-key': 'CG-NBA8qBgeGZhS425dxhR4BG1z'
            }
          }
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
        
        // Fallback to mock data based on endpoint
        if (endpoint === 'coins/markets') {
          setData(mockCoinsData);
        } else if (endpoint === 'search/trending') {
          setData(mockTrendingData);
        } else if (endpoint.startsWith('coins/') && endpoint.includes('/market_chart')) {
          // Handle market chart requests
          setData(mockMarketData);
        } else if (endpoint.startsWith('coins/')) {
          // Handle coin detail requests
          const coinId = endpoint.split('/')[1];
          setData({
            ...mockCoinDetails,
            id: coinId,
            name: coinId.charAt(0).toUpperCase() + coinId.slice(1),
            symbol: coinId.slice(0, 3)
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useCoinGecko;