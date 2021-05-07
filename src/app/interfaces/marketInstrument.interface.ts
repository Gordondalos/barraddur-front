export type Currency = 'RUB' | 'USD' | 'EUR' | 'GBP' | 'HKD' | 'CHF' | 'JPY' | 'CNY' | 'TRY';
export type InstrumentType = 'Stock' | 'Currency' | 'Bond' | 'Etf';

export interface MarketInstrument {
  figi: string;
  ticker: string;
  isin?: string;
  minPriceIncrement?: number;
  lot: number;
  currency?: Currency;
  name: string;
  type: InstrumentType;
}

