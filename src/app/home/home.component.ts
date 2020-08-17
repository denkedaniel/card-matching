import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Cardgame';
  cards = [
    {name: 'kdkdkd', number: '3'},
    {name: 'eewewe', number: '4'},
  ];

  constructor() {
  }

  ngOnInit() {
  }


}
