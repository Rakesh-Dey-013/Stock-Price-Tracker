import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useNavigate } from 'react-router-dom';

const StockCard = ({ stock }) => {
  const navigate = useNavigate();
  const isPositive = stock.change >= 0;
  
  const handleClick = () => {
    navigate(`/Stock-Price-Tracker/stock/${stock.id}`);
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 hover:border-zinc-600 h-full cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stock.name}</CardTitle>
        <span className="text-xs uppercase text-gray-400">{stock.symbol}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${stock.price.toLocaleString()}</div>
        <p className={`text-xs flex items-center mt-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '↗' : '↘'} ${Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
        </p>
        <div className="mt-4">
          <p className="text-xs text-gray-400">Sector: {stock.sector}</p>
          <p className="text-xs text-gray-400">Exchange: {stock.exchange}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;