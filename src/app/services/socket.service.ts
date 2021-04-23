import { Injectable } from '@angular/core';
import { FatherService } from './father.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { StockService } from './stock.service';
import { LocalstorageService } from './localstorage.service';
import { InstrumentInfoInterface } from '../interfaces/instrument-info.interface';
import { InstrumentInterface } from '../interfaces/instrumentInterface';
import { WebSocketSubject } from 'rxjs/internal-compatibility';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class SocketService extends FatherService {

  eventSocketUpdate: Subject<any> = new Subject();
  eventSocketUpdateOrderBook: Subject<any> = new Subject();

  myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:5000/socket');

  constructor(
    public httpClient: HttpClient,
    public stockService: StockService,
    public localstorageService: LocalstorageService,
  ) {
    super(httpClient);
  }

  sendMessage(msg: string) {
    // this.socket.emit('message', msg);
    console.log(msg);
  }

  connect() {

    this.myWebSocket.subscribe(
      // Called whenever there is a message from the server
      (msg) => {
        console.log('message received: ' + msg);
      },
      // Called if WebSocket API signals some kind of error
      (err) => {
        console.log(err);
      },
      // Called when connection is closed (for whatever reason)
      () => {
        console.log('complete');
      },


    );


    // this.sendMessage('getId');
    //
    // this.socket
    //   .fromEvent('message')
    //   .pipe(map((data: any) => {
    //     return data;
    //   })).subscribe((message) => {
    //
    //   try {
    //     let m: any = message;
    //     let id = '';
    //     if (typeof m === 'object' && m.clientId) {
    //       id = m.clientId;
    //       m = 'clientId';
    //     }
    //
    //     switch (m) {
    //       case 'clientId':
    //         console.log('socketClientId --->', id);
    //         this.localstorageService.set('socketId', id);
    //         break;
    //       case 'updatePortfolio':
    //         console.log('updatePortfolio');
    //         this.stockService.updateInstrumentsList.next();
    //         break;
    //       default:
    //         const mes = JSON.parse(m);
    //         if (mes.event === 'candle') {
    //           this.eventSocketUpdate.next(mes);
    //         }
    //         if (mes.event === 'orderbook') {
    //           this.eventSocketUpdateOrderBook.next(mes.payload);
    //         }
    //     }
    //
    //   } catch (e) {
    //     console.log(e);
    //     console.log(message.data);
    //   }
    // });
  }

  subscribeInstrument(data: InstrumentInterface | InstrumentInfoInterface) {
    // TODO период задан жестко, нужно как то его хранить и обрабатывать
    return this.post('/api/subscribeInstrument', { instrument: data, period: 'hour' });
  }

  unSubscribeInstrument(data: InstrumentInterface | InstrumentInfoInterface) {
    // TODO период задан жестко, нужно как то его хранить и обрабатывать
    return this.post('/api/unSubscribeInstrument', { instrument: data, period: 'hour' });
  }


  startSubscribtion(data: InstrumentInterface[] | InstrumentInfoInterface[]) {
    return this.post('/api/socketFire', { data });
  }

}
