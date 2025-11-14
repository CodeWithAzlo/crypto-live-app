import React from "react";
import { useCoinTicker } from "../hooks/useCryptoQueries";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import "./../styles/pages.css";

export default function About() {
  const { data, isLoading, error } = useCoinTicker("btc-bitcoin");

  if (isLoading) return <Loader text="Loading Bitcoin data..." />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="page about">
      {/* Hero / Header */}
      <motion.section
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>💰 Bitcoin (BTC) Overview</h1>
        <p>Live market stats and real-time price updates</p>
      </motion.section>

      {/* Bitcoin Card */}
      <div className="btc-card-container">
        <motion.div
          className="btc-card"
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="btc-header">
            <img
              src={`https://coinpaprika.com/coin/${data.id}/logo.png`}
              alt={data.symbol}
              onError={(e) => { e.target.src = "https://via.placeholder.com/64"; }}
              className="btc-icon"
            />
            <h2>{data.name} ({data.symbol})</h2>
          </div>

          <div className="btc-stats">
            <div className="stat">
              <span>Price (USD)</span>
              <strong>${data.quotes.USD.price.toFixed(2)}</strong>
            </div>
            <div className="stat">
              <span>Market Cap</span>
              <strong>${data.quotes.USD.market_cap.toLocaleString()}</strong>
            </div>
            <div className="stat">
              <span>24h Volume</span>
              <strong>${data.quotes.USD.volume_24h.toLocaleString()}</strong>
            </div>
            <div className="stat">
              <span>24h Change</span>
              <strong style={{ color: data.quotes.USD.percent_change_24h >= 0 ? "#00ff7f" : "#ff4c4c" }}>
                {data.quotes.USD.percent_change_24h.toFixed(2)}%
              </strong>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
