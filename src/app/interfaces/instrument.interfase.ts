export interface InstrumentInterfase {
  balance: number;
  blocked: number;
  figi: string;
  instrumentType: string;
  isin?: string;
  lots: number;
  name: string;
  ticker: string;
}
