export interface OneOperation  {
  id: string;
  status: string;
  trades: [
    {
      tradeId: string;
      date: string;
      price: number;
      quantity: number;
    }
  ];
  commission: {
    currency: string;
    value: number
  };
  currency: string;
  payment: number;
  price: number;
  quantity: number;
  quantityExecuted: number;
  figi: string;
  instrumentType: string;
  isMarginCall: true;
  date: string;
  operationType: string;
}

export interface OperationsInterface {
  trackingId: string;
  status: string;
  payload: {
    operations: Array<OneOperation>
  };
}
