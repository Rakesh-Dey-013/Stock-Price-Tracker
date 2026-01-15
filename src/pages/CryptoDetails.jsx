import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import useCoinGecko from '../hooks/useCoinGecko';
import { Skeleton } from '../components/ui/skeleton';

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

const CryptoDetails = () => {
  const { id } = useParams();
  const [currency, setCurrency] = useState('USD');
  const [conversionRate, setConversionRate] = useState(83.5); // Default USD to INR rate
  const [timeRange, setTimeRange] = useState('7'); // 1, 7, 14, 30, 90, 180, 365

  // Fetch coin details
  const { data: coin, loading: coinLoading, error: coinError } = useCoinGecko(`coins/${id}`, {
    localization: false,
    tickers: false,
    market_data: true,
    community_data: false,
    developer_data: false,
    sparkline: false
  });

  // Fetch market chart data
  const { data: marketData, loading: marketLoading } = useCoinGecko(`coins/${id}/market_chart`, {
    vs_currency: 'usd',
    days: timeRange
  });

  // Format currency based on selection
  const formatCurrency = (value) => {
    if (!value) return 'N/A';
    if (currency === 'INR') {
      return `₹${(value * conversionRate).toFixed(2)}`;
    }
    return `$${value.toFixed(2)}`;
  };

  // Format large numbers
  const formatLargeNumber = (num) => {
    if (!num) return 'N/A';
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num}`;
  };

  // Prepare chart data
  const chartData = {
    labels: marketData?.prices ? marketData.prices.map(item => new Date(item[0]).toLocaleDateString()) : [],
    datasets: [
      {
        label: `${coin?.name || 'Crypto'} Price`,
        data: marketData?.prices ? marketData.prices.map(item => 
          currency === 'INR' ? item[1] * conversionRate : item[1]
        ) : [],
        borderColor: coin?.market_data?.price_change_percentage_24h >= 0 ? 'rgb(74, 222, 128)' : 'rgb(248, 113, 113)',
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
        text: `${coin?.name || 'Crypto'} (${coin?.symbol?.toUpperCase() || ''}) Price History`,
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
        callbacks: {
          label: function(context) {
            return currency === 'INR' ? `₹${context.raw.toFixed(2)}` : `$${context.raw.toFixed(2)}`;
          }
        }
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

  if (coinError) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Crypto Not Found</h1>
            <Link to="/markets" className="text-blue-400 hover:text-blue-300">
              Return to Markets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (coinLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
            <div>
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isPositive = coin.market_data.price_change_percentage_24h >= 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/markets">
            <Button variant="outline" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Markets
            </Button>
          </Link>
        </div>

        {/* Crypto Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4">
            <img src={coin.image.large} alt={coin.name} className="w-12 h-12 rounded-full" />
            <div>
              <h1 className="text-3xl font-bold">{coin.name}</h1>
              <p className="text-gray-400">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="text-right">
              <div className="text-2xl font-bold">{formatCurrency(coin.market_data.current_price.usd)}</div>
              <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? '↗' : '↘'} {Math.abs(coin.market_data.price_change_percentage_24h).toFixed(2)}%
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
            {['1', '7', '14', '30', '90', '180', '365'].map((range) => (
              <button
                key={range}
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  timeRange === range 
                    ? 'bg-zinc-800 text-white' 
                    : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                } border border-zinc-700 ${range === '1' ? 'rounded-l-lg' : ''} ${range === '365' ? 'rounded-r-lg' : ''}`}
                onClick={() => setTimeRange(range)}
              >
                {range === '1' ? '24H' : `${range}D`}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {marketLoading ? (
              <Skeleton className="h-96 w-full" />
            ) : (
              <div className="h-96">
                <Line data={chartData} options={chartOptions} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Crypto Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap</span>
                  <span>{formatLargeNumber(coin.market_data.market_cap.usd)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Volume (24h)</span>
                  <span>{formatLargeNumber(coin.market_data.total_volume.usd)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Circulating Supply</span>
                  <span>{coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Supply</span>
                  <span>{coin.market_data.total_supply ? `${coin.market_data.total_supply.toLocaleString()} ${coin.symbol.toUpperCase()}` : 'N/A'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">24H Change</span>
                  <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
                    {formatCurrency(coin.market_data.price_change_24h_in_currency.usd)} ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">7D Change</span>
                  <span className={coin.market_data.price_change_percentage_7d >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {coin.market_data.price_change_percentage_7d.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">30D Change</span>
                  <span className={coin.market_data.price_change_percentage_30d >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">All-Time High</span>
                  <span>{formatCurrency(coin.market_data.ath.usd)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;