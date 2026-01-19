# 📈 Stock Price Tracker: Crypto + Stocks

A comprehensive real-time dashboard for tracking both stock market performance and cryptocurrency prices. This application combines custom stock data with live crypto updates from the CoinGecko API to provide a unified financial overview.

### Live Demo : [https://rakesh-dey-013.github.io/Stock-Price-Tracker/](https://rakesh-dey-013.github.io/Stock-Price-Tracker/)

---

## 🖼️ Gallery

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/Rakesh-Dey-013/Stock-Price-Tracker/blob/main//src/assets/home.png" alt="Home Page" width="350"/>
  <img src="https://github.com/Rakesh-Dey-013/Stock-Price-Tracker/blob/main//src/assets/stocksTable.png" alt="All Stocks Table Page" width="350"/>
  <img src="https://github.com/Rakesh-Dey-013/Stock-Price-Tracker/blob/main//src/assets/chart.png" alt="Stocks Details Page" width="350"/>
  <img src="https://github.com/Rakesh-Dey-013/Stock-Price-Tracker/blob/main/src/assets/about.png" alt="About Page" width="350"/>
</p>

---

---

## 🚀 Features

- **Live Crypto Tracking**: Fetches real-time price, market cap, and 24h change for top cryptocurrencies using the **CoinGecko API**.
- **Custom Stock Data**: Integrated `stocks.js` module providing detailed metrics for major companies like Apple, Microsoft, and NVIDIA, including market cap, volume, and daily highs/lows.
- **Dynamic Charts**: Interactive price history visualizations using generated data points for different time ranges (1D, 1W, 1M, etc.).
- **Responsive UI**: A modern, dark-themed dashboard built with **Tailwind CSS** and **Radix UI** primitives for accessibility and smooth interactions.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **API**: [CoinGecko API](https://www.coingecko.com/en/api)

## 📦 Installation & Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/rakesh-dey-013/Stock-Price-Tracker.git

    cd Stock-Price-Tracker
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run dev
    ```
4. **Open your browser and navigate to:**

    ```
    http://localhost:5173
    ```

## 📂 Project Structure

```bash
Stock-Price-Tracker/
├── src/
│   ├── assets/             # Images and static assets
│   ├── components/
│   │   ├── ui/             # Reusable Radix UI components (Button, Card, Input)
│   │   ├── CryptoCard.jsx
│   │   ├── CryptoTable.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── StockCard.jsx
│   ├── data/
│   │   └── stocks.js       # Stock data and history generation logic
│   ├── hooks/
│   │   └── useCoinGecko.js  # Custom hook for API integration
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── CryptoDetails.jsx
│   │   ├── Home.jsx
│   │   ├── Markets.jsx
│   │   └── StockDetails.jsx
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global Tailwind styles
│   └── main.jsx            # Entry point
├── index.html
├── tailwind.config.js
└── vite.config.js
```