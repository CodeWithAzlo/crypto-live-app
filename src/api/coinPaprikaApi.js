import axios from "axios";

const paprikaApi = axios.create({
  baseURL: "https://api.coinpaprika.com/v1",
  timeout: 30000, // 30 seconds timeout
});


export const getAllCoins = async () => {
  try {
    const res = await paprikaApi.get("/coins");
    return res.data;
  } catch (err) {
    console.error("Error fetching coins:", err);
    return [];
  }
};
// fetch live ticker by coin id
export const getCoinTicker = async (coinId) => {
  const res = await paprikaApi.get(`/tickers/${coinId}`);
  return res.data;
};

// fetch historical OHLC data (optional)
export const getCoinOHLC = async (coinId, start, end) => {
  const res = await paprikaApi.get(`/coins/${coinId}/ohlcv/historical`, {
    params: { start, end },
  });
  return res.data;
};

// fetch global data
export const getGlobalInfo = async () => {
  const res = await paprikaApi.get("/global");
  return res.data;
};

// fetch top N coins (e.g., top 50) with live ticker info
export const getTopCoins = async (limit = 50) => {
  const res = await paprikaApi.get("/tickers");
  return res.data.slice(0, limit); // top N coins
};
