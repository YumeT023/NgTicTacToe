import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../Helper/Interface';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(public messageService: MessagesService) { }

  ngOnInit(): void {
    console.log('[StatusComponent]: has been created...');
  }

}
