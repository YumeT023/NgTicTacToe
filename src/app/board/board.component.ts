import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { calculateWinner } from '../Helper/HelperFn';
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
    point: Array(9).fill(null),
    class: Array(9).fill(false)
  }

  isOver = false;
  xIsNext = true;

  onClick(index: number): void {
    if (this.isOver) {
      // alert('the part is already over')
      return;
    }

    let message: Message = {
      player: '',
      message: ''
    }

    if (!this.squares.point[index]) {
      const put = (this.xIsNext = !this.xIsNext) ? 'O' : 'X';
      this.squares.point[index] = put;


      message = {...message, message: " it's your turn"};

      const winnerLine = calculateWinner(this.squares.point);

      if (winnerLine) {
        this.isOver = true;
        this.announce(winnerLine);
      }
    } else {
      message = {...message, message: " this block is already filled", isError: true};
    }

    this.messageService.add({...message, player: this.xIsNext ? 'X' : 'O'});
  }

  announce(winnerLine: number[]) {
    winnerLine.forEach(index => this.squares.class[index] = true);
  }

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
    console.log('[BoardComponent]: has been created')
  }

}
  