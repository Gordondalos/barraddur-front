export interface InstrumentInterface {
  balance: number;
  blocked: number;
  figi: string;
  instrumentType: string;
  isin?: string;
  lots: number;
  name: string;
  ticker: string;
  price: number;
}
