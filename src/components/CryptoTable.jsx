import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

const CryptoTable = ({ coins, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'descending' });
  const navigate = useNavigate();

  const filteredCoins = useMemo(() => {
    if (!coins) return [];
    
    return coins.filter(coin => 
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [coins, searchTerm]);

  const sortedCoins = useMemo(() => {
    if (!filteredCoins) return [];
    
    let sortableCoins = [...filteredCoins];
    if (sortConfig.key) {
      sortableCoins.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCoins;
  }, [filteredCoins, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const handleRowClick = (coinId) => {
    navigate(`/crypto/${coinId}`);
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-4">
          <Skeleton className="h-10 w-full max-w-sm" />
        </div>
        <div className="rounded-md border border-zinc-800">
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-zinc-800">
            {['Name', 'Price', '24h %', '7d %', 'Market Cap', 'Volume'].map((item) => (
              <div key={item} className="font-medium text-sm text-gray-400">
                {item}
              </div>
            ))}
          </div>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 p-4 border-b border-zinc-800 last:border-b-0">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border border-zinc-800 overflow-x-auto">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-zinc-800 min-w-[800px]">
          {[
            { key: 'name', label: 'Name' },
            { key: 'current_price', label: 'Price' },
            { key: 'price_change_percentage_24h', label: '24h %' },
            { key: 'price_change_percentage_7d_in_currency', label: '7d %' },
            { key: 'market_cap', label: 'Market Cap' },
            { key: 'total_volume', label: 'Volume' }
          ].map(({ key, label }) => (
            <div
              key={key}
              className="font-medium text-sm text-gray-400 cursor-pointer hover:text-white flex items-center"
              onClick={() => requestSort(key)}
            >
              {label} {getSortIndicator(key)}
            </div>
          ))}
        </div>
        {sortedCoins.length > 0 ? (
          sortedCoins.map((coin) => (
            <div 
              key={coin.id} 
              className="grid grid-cols-6 gap-4 p-4 border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800/50 transition-colors min-w-[800px] cursor-pointer"
              onClick={() => handleRowClick(coin.id)}
            >
              <div className="flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="h-6 w-6 rounded-full" />
                <span className="font-medium">{coin.name}</span>
                <span className="text-xs text-gray-400 uppercase">{coin.symbol}</span>
              </div>
              <div>${coin.current_price.toLocaleString()}</div>
              <div className={coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </div>
              <div className={coin.price_change_percentage_7d_in_currency >= 0 ? 'text-green-400' : 'text-red-400'}>
                {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
              </div>
              <div>${coin.market_cap.toLocaleString()}</div>
              <div>${coin.total_volume.toLocaleString()}</div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-400">No cryptocurrencies found</div>
        )}
      </div>
    </div>
  );
};

export default CryptoTable;