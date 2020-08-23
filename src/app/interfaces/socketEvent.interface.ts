export interface SocketEventInterface {
  event: string;
  payload: {
    c: number;
    figi: string;
    h: number
    interval: string;
    l: number;
    o: number;
    time: string;
    v: number;
  };
  time: string;
}
