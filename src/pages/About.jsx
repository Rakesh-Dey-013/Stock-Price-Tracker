import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FaGithub, FaLinkedin, FaReact, FaCss3Alt, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import { FaBitcoin } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">About CryptoStocks</h1>
          <p className="text-lg text-gray-400">
            A modern platform for tracking cryptocurrency and stock market data in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Our Purpose</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                CryptoStocks was created to provide investors and enthusiasts with a clean,
                intuitive interface to monitor both cryptocurrency and traditional stock markets.
                We believe in making financial data accessible and understandable for everyone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our cryptocurrency data is powered by the CoinGecko API, providing real-time
                prices, market caps, trading volumes, and more. Stock data is currently simulated
                for demonstration purposes.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'React', icon: <FaReact className="text-4xl text-blue-400" /> },
              { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-4xl text-cyan-400" /> },
              { name: 'CoinGecko API', icon: <FaBitcoin  className="text-4xl text-amber-400" /> },
              { name: 'Radix UI', icon: <FaCss3Alt className="text-4xl text-orange-400" /> }
            ].map((tech, index) => (
              <Card key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {tech.icon}
                </div>
                <h3 className="font-medium">{tech.name}</h3>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">Developer</h2>
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  RD
                </div>
                <h3 className="text-xl font-semibold mb-2">Rakesh Dey</h3>
                <p className="text-gray-400 mb-4">Frontend Developer</p>
                <p className="text-gray-300 mb-4">
                  Passionate about building modern web applications with React and Node.js.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://github.com/Rakesh-Dey-013"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rakeshdey007/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;