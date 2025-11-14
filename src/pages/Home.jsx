import React from "react";
import { useTopCoins } from "../hooks/useCryptoQueries";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import "./Home.css";

export default function Home() {
  const { data, isLoading } = useTopCoins();

  if (isLoading) return <Loader text="Loading top coins..." />;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>
              <Typewriter
                words={[
                  "🚀 Explore the Crypto World",
                  "💰 Track Live Prices",
                  "📊 Stay Updated with Top Coins",
                ]}
                loop={0} // 0 = infinite
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </h1>
            <p>Track live prices, market caps, and trending cryptocurrencies</p>
          </div>
        </div>
      </motion.section>

      {/* Coins Grid */}
      <section className="coins-section">
        <h2>Top 50 Coins</h2>
        <div className="coins-grid">
          {data.map((coin) => (
            <motion.div
              key={coin.id}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="coin-card"
            >
              <img
                src={`https://coinpaprika.com/coin/${coin.id}/logo.png`}
                alt={coin.symbol}
                className="coin-icon"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/64";
                }}
              />
              <h3>
                {coin.name} ({coin.symbol})
              </h3>
              <p>Price: ${coin.quotes.USD.price.toFixed(2)}</p>
              <p>Market Cap: ${coin.quotes.USD.market_cap.toLocaleString()}</p>
              <p
                style={{
                  color:
                    coin.quotes.USD.percent_change_24h >= 0 ? "#00ff7f" : "#ff4c4c",
                }}
              >
                24h Change: {coin.quotes.USD.percent_change_24h.toFixed(2)}%
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
