import { Injectable } from '@angular/core';
import { FatherService } from './father.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { SocketEventInterface } from '../interfaces/socketEvent.interface';
import { StockService } from './stock.service';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { LocalstorageService } from './localstorage.service';
import { InstrumentInfoInterface } from '../interfaces/instrument-info.interface';
import { InstrumentInterface } from '../interfaces/instrumentInterface';

@Injectable({
  providedIn: 'root',
})
export class SocketService extends FatherService {

  eventSocketUpdate: Subject<any> = new Subject();
  ws: WebSocket;

  constructor(
    public httpClient: HttpClient,
    public stockService: StockService,
    private socket: Socket,
    public localstorageService: LocalstorageService,
  ) {
    super(httpClient);
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  connect() {
    this.sendMessage('getId');

    this.socket
      .fromEvent('message')
      .pipe(map((data: any) => {
        return data;
      })).subscribe((message) => {

      try {
        let m: any = message;
        let id = '';
        if (typeof m === 'object' && m.clientId) {
          id = m.clientId;
          m = 'clientId';
        }

        // console.log(JSON.parse(m).payload.figi);

        switch (m) {
          case 'clientId':
            console.log(id);
            this.localstorageService.set('socketId', id);
            break;
          case 'updatePortfolio':
            console.log('updatePortfolio');
            this.stockService.updateInstrumentsList.next();
            break;
          default:
            this.eventSocketUpdate.next(JSON.parse(m));
        }

      } catch (e) {
        console.log(e);
        console.log(message.data);
      }
    });
  }

  subscribeInstrument(data: InstrumentInterface | InstrumentInfoInterface) {
    return this.post('/api/subscribeInstrument', {instrument: data, period: 'hour'});
  }


  startSubscribtion(data: InstrumentInterface[] | InstrumentInfoInterface[]) {
    return this.post('/api/socketFire', { data });
  }

}
