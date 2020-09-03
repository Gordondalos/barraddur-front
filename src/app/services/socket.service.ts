import { Injectable } from '@angular/core';
import { FatherService } from './father.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { SocketEventInterface } from '../interfaces/socketEvent.interface';
import { StockService } from './stock.service';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { LocalstorageService } from './localstorage.service';

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


  startSubscribtion(data) {
    return this.post('/api/socketFire', { data });
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
            const m: SocketEventInterface | string = message.data;
            switch (m) {
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
        }
      }
    };
  }


}
