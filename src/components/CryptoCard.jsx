import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useNavigate } from 'react-router-dom';

const CryptoCard = ({ coin }) => {
  const navigate = useNavigate();
  const isPositive = coin.price_change_percentage_24h >= 0;
  
  const handleClick = () => {
    navigate(`/crypto/${coin.id}`);
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 hover:border-zinc-600 h-full cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
          {coin.name}
        </CardTitle>
        <span className="text-xs uppercase text-gray-400">{coin.symbol}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${coin.current_price.toLocaleString()}</div>
        <p className={`text-xs flex items-center mt-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '↗' : '↘'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </p>
        <div className="mt-4">
          <p className="text-xs text-gray-400">Market Cap: ${coin.market_cap.toLocaleString()}</p>
          <p className="text-xs text-gray-400">24h Vol: ${coin.total_volume.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;