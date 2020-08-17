import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  cards = [
    {title: 'angular'},
    {title: 'webpack'},
    {title: 'ts'},
    {title: 'splendex'},
    {title: 'sass'},
    {title: 'redux'},
    {title: 'react'},
    {title: 'postcss'},
    {title: 'jenkins'},
    {title: 'd3'}
  ];
  tries = 0;
  selectedDeckSize = 0;
  finalCardDeck = [];
  foundMatches = 0;
  matches = [];
  triesBestScore;
  flipCount = 1;

  constructor(private router: Router, private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit() {
    this.selectedDeckSize = Number(this.route.snapshot.paramMap.get('decksize'));
    this.finalCardDeck = this.shuffle(this.cards);
    this.triesBestScore = localStorage.getItem('triesBestScore') || 0;
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    const slicedArrayOfCards = array.slice(0, this.selectedDeckSize);
    const finalArrayOfCards = [];
    let j = 0;
    for (let i = 0; i < slicedArrayOfCards.length; ++i) {
      slicedArrayOfCards[i].index = i + j;

      j++;

      finalArrayOfCards.push(slicedArrayOfCards[i]);
      slicedArrayOfCards[i].index = i + j;

      finalArrayOfCards.push(slicedArrayOfCards[i]);
    }

    currentIndex = finalArrayOfCards.length;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = finalArrayOfCards[currentIndex];
      finalArrayOfCards[currentIndex] = finalArrayOfCards[randomIndex];
      finalArrayOfCards[randomIndex] = temporaryValue;
    }

    return finalArrayOfCards;

  }

  cardFlipped(item, i, el) {
    if (this.flipCount === 3) {
      this.flipCount = 1;
      this.matches = [];
      const flipCardInner = document.getElementsByClassName('flip-card-inner');
      Array.prototype.forEach.call(flipCardInner, (value) => {
        value.classList.remove('open');
        value.classList.remove('disabled');
      });
    }
    el.target.parentNode.classList.add('open');
    el.target.parentNode.classList.add('disabled');
    this.tries++;

    if (this.matches.length) {
      if (item.title === this.matches[0].parentNode.getAttribute('data-value')) {
        el.target.parentNode.removeChild(el.target);
        this.matches[0].parentNode.removeChild(this.matches[0]);
        this.foundMatches++;
        if (this.foundMatches === (this.finalCardDeck.length / 2)) {
          alert('Játék vége');
          if (localStorage.getItem('triesBestScore')) {
            const bestScore = Number(localStorage.getItem('triesBestScore'));
            if (bestScore > this.tries) {
              localStorage.setItem('triesBestScore', JSON.stringify(this.tries));
            }
          } else {
            localStorage.setItem('triesBestScore', JSON.stringify(this.tries));
          }
        }
      } else {

      }
    } else {
      this.matches.push(el.target);
    }
    this.flipCount++;

  }


}
