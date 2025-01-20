export interface Stock {
  symbol: string;
  companyName: string;
  currentPrice: number;
  dailyHigh: number;
  dailyLow: number;
  weeklyHigh: number;
  weeklyLow: number;
  isPriceUpdating: boolean;
}

export const initialStocks: Stock[] = [
  {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    currentPrice: 170.34,
    dailyHigh: 172.5,
    dailyLow: 169.2,
    weeklyHigh: 182.94,
    weeklyLow: 124.17,
    isPriceUpdating: true,
  },
  {
    symbol: 'MSFT',
    companyName: 'Microsoft Corp.',
    currentPrice: 330.2,
    dailyHigh: 332.8,
    dailyLow: 328.5,
    weeklyHigh: 349.67,
    weeklyLow: 211.62,
    isPriceUpdating: true,
  },
  {
    symbol: 'TSLA',
    companyName: 'Tesla, Inc.',
    currentPrice: 240.5,
    dailyHigh: 245.0,
    dailyLow: 238.0,
    weeklyHigh: 314.67,
    weeklyLow: 101.81,
    isPriceUpdating: true,
  },
  {
    symbol: 'GOOG',
    companyName: 'Alphabet Inc.',
    currentPrice: 120.75,
    dailyHigh: 122.0,
    dailyLow: 119.5,
    weeklyHigh: 145.0,
    weeklyLow: 83.34,
    isPriceUpdating: true,
  },
];
