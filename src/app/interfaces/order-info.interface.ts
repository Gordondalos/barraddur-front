import { Order } from './instrumentInterface';
import { Currency, InstrumentType } from './marketInstrument.interface';

export interface OrderInfoInterface extends Order {
  figi: string;
  ticker: string;
  isin?: string;
  minPriceIncrement?: number;
  lot: number;
  currency?: Currency;
  name: string;
  type: InstrumentType;
}
