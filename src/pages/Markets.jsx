import React, { useState } from 'react';
import CryptoTable from '../components/CryptoTable';
import StockCard from '../components/StockCard';
import { stocks } from '../data/stocks';
import useCoinGecko from '../hooks/useCoinGecko';

const Markets = () => {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('crypto'); // 'crypto' or 'stocks'
  const { data: coins, loading, error } = useCoinGecko('coins/markets', {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 50,
    page: page,
    sparkline: false,
    price_change_percentage: '24h,7d'
  });

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Data</h1>
            <p className="text-gray-400">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Financial Markets</h1>
          <p className="text-gray-400">Real-time prices, trends, and market data for cryptocurrencies and stocks.</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-zinc-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('crypto')}
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'crypto'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300'
                }`}
              >
                Cryptocurrencies
              </button>
              <button
                onClick={() => setActiveTab('stocks')}
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'stocks'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300'
                }`}
              >
                Stocks
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'crypto' ? (
          <>
            <CryptoTable coins={coins} loading={loading} />

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-zinc-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
              >
                Previous
              </button>
              <span className="text-gray-400">Page {page}</span>
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="px-4 py-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Stock Market</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stocks.map(stock => (
                <StockCard key={stock.id} stock={stock} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Markets;