import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Markets from './pages/Markets';
import About from './pages/About';
import StockDetails from './pages/StockDetails';
import CryptoDetails from './pages/CryptoDetails';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-zinc-900 text-gray-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/about" element={<About />} />
            <Route path="/stock/:id" element={<StockDetails />} />
            <Route path="/crypto/:id" element={<CryptoDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;