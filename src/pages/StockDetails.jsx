import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stocks, getStockHistory } from '../data/stocks';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StockDetails = () => {
  const { id } = useParams();
  const [stock, setStock] = useState(null);
  const [history, setHistory] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [conversionRate, setConversionRate] = useState(83.5); // Default USD to INR rate
  const [timeRange, setTimeRange] = useState('1W'); // 1D, 1W, 1M, 3M, 1Y

  useEffect(() => {
    // Find the stock by ID
    const foundStock = stocks.find(s => s.id === parseInt(id));
    setStock(foundStock);
    
    // Get historical data
    if (foundStock) {
      const historicalData = getStockHistory(foundStock.symbol, timeRange);
      setHistory(historicalData);
    }
    
    // In a real app, you would fetch the current conversion rate from an API
    // For demo purposes, we're using a fixed rate
  }, [id, timeRange]);

  // Format currency based on selection
  const formatCurrency = (value) => {
    if (currency === 'INR') {
      return `₹${(value * conversionRate).toFixed(2)}`;
    }
    return `$${value.toFixed(2)}`;
  };

  // Calculate percentage change
  const calculateChange = () => {
    if (history.length > 1) {
      const first = history[0].price;
      const last = history[history.length - 1].price;
      return ((last - first) / first) * 100;
    }
    return 0;
  };

  // Prepare chart data
  const chartData = {
    labels: history.map(item => item.date),
    datasets: [
      {
        label: `${stock?.symbol} Price`,
        data: history.map(item => 
          currency === 'INR' ? item.price * conversionRate : item.price
        ),
        borderColor: calculateChange() >= 0 ? 'rgb(74, 222, 128)' : 'rgb(248, 113, 113)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(63, 63, 70)',
        pointBorderColor: 'rgb(161, 161, 170)',
        pointRadius: 2,
        pointHoverRadius: 5,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(161, 161, 170)',
        }
      },
      title: {
        display: true,
        text: `${stock?.name} (${stock?.symbol}) Price History`,
        color: 'rgb(161, 161, 170)',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgb(39, 39, 42)',
        titleColor: 'rgb(161, 161, 170)',
        bodyColor: 'rgb(161, 161, 170)',
        borderColor: 'rgb(63, 63, 70)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(63, 63, 70, 0.5)',
        },
        ticks: {
          color: 'rgb(161, 161, 170)',
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: {
          color: 'rgba(63, 63, 70, 0.5)',
        },
        ticks: {
          color: 'rgb(161, 161, 170)',
          callback: function(value) {
            return currency === 'INR' ? `₹${value}` : `$${value}`;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    maintainAspectRatio: false,
  };

  if (!stock) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Stock Not Found</h1>
            <Link to="/" className="text-blue-400 hover:text-blue-300">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const changePercent = calculateChange();
  const isPositive = changePercent >= 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Stock Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{stock.name}</h1>
            <p className="text-gray-400">{stock.symbol} • {stock.exchange}</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="text-right">
              <div className="text-2xl font-bold">{formatCurrency(stock.price)}</div>
              <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? '↗' : '↘'} {formatCurrency(Math.abs(stock.change))} ({Math.abs(stock.changePercent).toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>

        {/* Currency Toggle */}
        <div className="mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                currency === 'USD' 
                  ? 'bg-zinc-800 text-white' 
                  : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
              } border border-zinc-700`}
              onClick={() => setCurrency('USD')}
            >
              USD
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                currency === 'INR' 
                  ? 'bg-zinc-800 text-white' 
                  : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
              } border border-zinc-700`}
              onClick={() => setCurrency('INR')}
            >
              INR
            </button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            {['1D', '1W', '1M', '3M', '1Y'].map((range) => (
              <button
                key={range}
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  timeRange === range 
                    ? 'bg-zinc-800 text-white' 
                    : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                } border border-zinc-700 ${range === '1D' ? 'rounded-l-lg' : ''} ${range === '1Y' ? 'rounded-r-lg' : ''}`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="h-96">
              <Line data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Stock Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sector</span>
                  <span>{stock.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Exchange</span>
                  <span>{stock.exchange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap</span>
                  <span>{formatCurrency(stock.marketCap || stock.price * 1e9)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Volume</span>
                  <span>{stock.volume ? formatCurrency(stock.volume) : 'N/A'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Open</span>
                  <span>{formatCurrency(stock.open || stock.price * 0.98)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Previous Close</span>
                  <span>{formatCurrency(stock.previousClose || stock.price - stock.change)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Day High</span>
                  <span>{formatCurrency(stock.dayHigh || stock.price * 1.02)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Day Low</span>
                  <span>{formatCurrency(stock.dayLow || stock.price * 0.98)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;