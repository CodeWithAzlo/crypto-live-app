import { useQuery } from "@tanstack/react-query";
import { getAllCoins, getCoinTicker, getTopCoins } from "../api/coinPaprikaApi";

const famousCoinIds = ["btc-bitcoin", "eth-ethereum", "bnb-binance-coin", "ada-cardano"];

export const useFamousCoins = () => {
  return useQuery({
    queryKey: ["famousCoins"],
    queryFn: async () => {
      const promises = famousCoinIds.map((id) => getCoinTicker(id));
      const results = await Promise.all(promises);
      return results;
    },
    staleTime: 1000 * 60 * 1, // cache for 1 minute
  });
};

// fetch single coin live data
export const useCoinTicker = (coinId) => {
  return useQuery({
    queryKey: ["coinTicker", coinId],
    queryFn: () => getCoinTicker(coinId),
    enabled: !!coinId,
    refetchInterval: 5000, // live price update
  });
};

export const useAllCoins = () => {
  return useQuery({
    queryKey: ["allCoins"],
    queryFn: async () => {
      const coins = await getAllCoins();
      return coins.slice(0, 500); // limit to first 500 coins
    },
    staleTime: 1000 * 60 * 60,
  });
};

// fetch top coins with live updates
export const useTopCoins = () => {
  return useQuery({
    queryKey: ["topCoins"],
    queryFn: () => getTopCoins(50), // fetch top 50 coins
    refetchInterval: 5000,          // refresh every 5 seconds
  });
};
