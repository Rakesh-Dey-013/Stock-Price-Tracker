import React from 'react';
import CryptoCard from '../components/CryptoCard';
import StockCard from '../components/StockCard';
import { stocks } from '../data/stocks';
import useCoinGecko from '../hooks/useCoinGecko';
import { Skeleton } from '../components/ui/skeleton';

const Home = () => {
  const { data: trendingData, loading: trendingLoading } = useCoinGecko('search/trending');
  const { data: coinsData, loading: coinsLoading } = useCoinGecko('coins/markets', {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 6,
    page: 1,
    sparkline: false,
    price_change_percentage: '24h,7d'
  });

  const trendingCoins = trendingData?.coins?.slice(0, 6).map(coin => coin.item) || [];
  const topCoins = coinsData || [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Track Crypto & Stock Markets</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real-time cryptocurrency prices and stock market data in one place. Stay updated with the latest market trends.
          </p>
        </div>

        {/* Trending Cryptocurrencies */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Trending Cryptocurrencies</h2>
          {trendingLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 h-full">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-8 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCoins.map(coin => (
                <CryptoCard 
                  key={coin.id} 
                  coin={{
                    ...coin,
                    image: coin.thumb,
                    current_price: coin.price_btc * 65000, // Approximate conversion for demonstration
                    price_change_percentage_24h: (Math.random() * 10 - 5).toFixed(2), // Random for demo
                    market_cap: Math.floor(Math.random() * 1000000000000),
                    total_volume: Math.floor(Math.random() * 50000000000)
                  }} 
                />
              ))}
            </div>
          )}
        </section>

        {/* Top Cryptocurrencies */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Top Cryptocurrencies</h2>
          {coinsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 h-full">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-8 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topCoins.map(coin => (
                <CryptoCard key={coin.id} coin={coin} />
              ))}
            </div>
          )}
        </section>

        {/* Stock Market Data */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Stock Market</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.map(stock => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;