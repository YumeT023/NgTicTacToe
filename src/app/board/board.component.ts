import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { calculateWinner, message as transMessage } from '../Helper/HelperFn';
import { Message, Square } from '../Helper/Interface';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [
    trigger('displayTransit', [
      state('appear', style({color: 'black'})),
      state('announceWinner', style({backgroundColor: "#D8a424"})),
      transition('* => appear', [
        animate('0.6s')
      ]),
      transition('* => announceWinner', [
        animate('0.8s')
      ])
    ])
  ]
})

export class BoardComponent implements OnInit {
  squares: Square = {
    point: Array(9).fill(''),
    class: Array(9).fill(false)
  }

  isOver = false;
  xIsNext = true;

  onClick(index: number): void {
    if (this.isOver) {
      // alert('the part is already over')
      return;
    }

    if (!this.squares.point[index]) {
      const put = (this.xIsNext = !this.xIsNext) ? 'O' : 'X';
      this.squares.point[index] = put;
      
      const winnerLine = calculateWinner(this.squares.point);

      if (winnerLine) {
        this.isOver = true;
        this.messageService.add(transMessage('Bot', 'We have a winner !!!'))
        this.announce(winnerLine);
        return ;
      }

      if (!this.squares.point.includes('')) {
        this.isOver = true;
        this.messageService.add(transMessage("Bot", "Draw '-'"));
        return ;
      }

    } else {
      this.messageService.add(transMessage(this.xIsNext ? 'X' : 'O', 'The block is already filled', true));
      return ;
    };

    this.messageService.add(transMessage(this.xIsNext ? 'X' : 'O', "it's you turn ... move"));
  }

  announce(winnerLine: number[]) {
    winnerLine.forEach(index => this.squares.class[index] = true);
  }

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
    console.log('[BoardComponent]: has been created');
  }

}
  