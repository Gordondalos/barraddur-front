import { Injectable } from '@angular/core';
import { FatherService } from './father.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { SocketEventInterface } from '../interfaces/socketEvent.interface';

@Injectable({
  providedIn: 'root',
})
export class SocketService extends FatherService {

  eventSocketUpdate: Subject<any> = new Subject();
  ws: WebSocket;

  constructor(
    public httpClient: HttpClient,
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

  subsOnMessage() {
    this.ws.onopen = () => {
      console.log('Соединение утановлено');
    };
    this.ws.onclose = () => {
      console.log('соединение отвалилось');
    };
    this.ws.onmessage = (message ) => {
      // console.log('получено сообщение', message);
      if (message.data && typeof message.data === 'string') {
        try {
          const m: SocketEventInterface = JSON.parse(message.data);
          this.eventSocketUpdate.next(m);
        } catch (e) {
          console.log(e);
          console.log(message.data);
        }
      }

    };


  }


}
