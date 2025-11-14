import React, { useState } from "react";
import { useAllCoins } from "../hooks/useCryptoQueries";
import Loader from "../components/Loader";
import "./Search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useAllCoins();

  if (isLoading) return <Loader text="Loading coins..." />;

  const filtered = data.filter(
    (c) =>
      c.symbol.toLowerCase().includes(query.toLowerCase()) ||
      c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search coin by symbol or name, e.g. BTC or Bitcoin"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="no-results">No coins found</p>
      ) : (
        <div className="grid">
          {filtered.slice(0, 100).map((coin) => (
            <div key={coin.id} className="coin-card">
              <img
                src={`https://coinpaprika.com/coin/${coin.id}/logo.png`}
                alt={coin.symbol}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/64";
                }}
              />
              <h3>
                {coin.name} ({coin.symbol})
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
