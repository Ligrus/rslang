import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-intro',
  templateUrl: './cards-intro.component.html',
  styleUrls: ['./cards-intro.component.scss'],
})
export class CardsIntroComponent implements OnInit {
  activeModeIndx: number = 0;
  learnCardsModes = [
    {
      title: 'Изучение слов',
      bg: 'url(../../../assets/images/backgrounds/new-words-background.png)',
      description:
        'Изучай новые слова из набора 3600 наиболее употребимых и используемых в английском языке',
    },
    {
      title: 'Повторение слов',
      bg: 'url(../../../assets/images/backgrounds/old-words-bg.png)',
      description:
        'Повторяй изученные слова, используя метод интервального повторения, который подстраивается под твои результаты',
    },
    {
      title: 'Все слова',
      bg: 'url(../../../assets/images/backgrounds/all-words-bg.png) no-repeat',
      description: 'Нет времени на раздельную тренировку? Выполни свой ежедневный план за один подход',
    },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let req = this.http.get(
      `http://localhost:3500/users/${localStorage.getItem('userId')}/words`
    );
    req.subscribe(
      (data) => {
        console.log('do stuff to data here', data);
      },
      (err) => {
        console.log("couldn't get data, maybe show error to user");
      },
      () => {
        console.log('function that is called upon finish');
      }
    );
  }

  setModePosition(cardIndex: number) {
    const translatexValue =  this.activeModeIndx === cardIndex
    ? '-50%'
    : this.activeModeIndx < cardIndex
    ? `${-50 + (cardIndex - this.activeModeIndx ) * 200}%`
    : `${-50 - ( this.activeModeIndx - cardIndex) * 200}%`

    return `translate(${translatexValue}, -50%)`
  }
}
