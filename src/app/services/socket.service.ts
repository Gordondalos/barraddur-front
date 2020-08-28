import { Injectable } from '@angular/core';
import { FatherService } from './father.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { SocketEventInterface } from '../interfaces/socketEvent.interface';
import { StockService } from './stock.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService extends FatherService {

  eventSocketUpdate: Subject<any> = new Subject();
  ws: WebSocket;

  constructor(
    public httpClient: HttpClient,
    public stockService: StockService,
  ) {
    super(httpClient);
  }

  startSubscribtion(data) {
    return this.post('/api/socketFire', { data });
  }

  connect() {
    this.ws = new WebSocket('ws://localhost:5000');
    this.subsOnMessage();
  }

  disconnect() {
    this.ws.send('exit');
    this.ws.close();
  }

  subsOnMessage() {
    this.ws.onopen = () => {
      console.log('Соединение утановлено');
      this.ws.send(JSON.stringify({ myId: 'qweqweqwe' }));
    };
    this.ws.onclose = () => {
      console.log('соединение отвалилось');
    };
    this.ws.onmessage = (message) => {
      // console.log('получено сообщение', message);
      if (message.data && typeof message.data === 'string') {
        if (message.data === 'isExist') {
          this.ws.send('exit');
          this.ws.close();
        } else {
          try {
            const m: SocketEventInterface | string = JSON.parse(message.data);
            switch (m) {
              case 'updatePortfolio':
                console.log('updatePortfolio');
                this.stockService.updateInstrumentsList.next();
                break;
              default:
                this.eventSocketUpdate.next(m);
            }

          } catch (e) {
            console.log(e);
            console.log(message.data);
          }
        }
      }
    };
  }


}
