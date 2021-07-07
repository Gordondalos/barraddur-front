export interface InstrumentInterface {
  averagePositionPrice: { currency: string, value: number };
  expectedYield: { currency: string, value: number };
  balance: number;
  blocked: number;
  figi: string;
  instrumentType: string;
  isin?: string;
  lots?: number;
  lot?: number;
  name: string;
  ticker: string;
  price: number;
  trailingStop?: boolean;
}

export interface Order {
  figi: string;
  price: number;
  requestedLots: number;
  executedLots: number;
  operation: string;
  orderId: string;
  status: string;
  type: string;
  ticker: string;
  name: string;
}
