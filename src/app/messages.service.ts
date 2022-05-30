import { Injectable } from '@angular/core';
import { Message } from './Helper/Interface';
import { Messages } from './Helper/Messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];

  add(msg: Message): void {
    this.messages.push(msg);
  }

  clear(): void {
    this.messages = [];
  }
}
