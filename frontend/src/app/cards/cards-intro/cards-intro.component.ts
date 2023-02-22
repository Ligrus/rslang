import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Constants } from 'src/app/config/constants';
import { ApiHttpService } from 'src/app/shared/services/http.service';
import { mergeMap, forkJoin, pluck, map, switchMap, toArray } from 'rxjs';
import { AggregatedWordsResponse } from '../interfaces/card.interface';
import { CardsDataService } from '../services/cards-data.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-cards-intro',
  templateUrl: './cards-intro.component.html',
  styleUrls: ['./cards-intro.component.scss'],
})
export class CardsIntroComponent implements OnInit {
  newCards: any;
  cardsForRevision: any;
  allCards: any;
  activeModeIndx: number = 0;
  reviseCardsAmount: number = 21;
  newCardsAmount = 7;

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
      description:
        'Нет времени на раздельную тренировку? Выполни свой ежедневный план за один подход',
    },
  ];

  constructor(
    private apiHttpService: ApiHttpService,
    private authService: AuthService,
    private cardsDataService: CardsDataService,
    private router: Router,
    private route: ActivatedRoute,
    private constants: Constants
  ) {}

  openCardsLearnMode(modeIndex: number) {
    switch (modeIndex) {
      case 0:
        this.cardsDataService.setOnlyNewCards();
        break;
      case 1:
        this.cardsDataService.setOnlyCardsForRevision();
        break;
      case 2:
        this.cardsDataService.setAllSessionCards();
        break;
      default:
        break;
    }
    this.router.navigate(['learn'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    const newCardsUrlParams = this.apiHttpService.setUrlParams({
      wordsPerPage: this.newCardsAmount,
      filter: JSON.stringify({ userWord: { $eq: null } }),
    });

    const cardsForRevisionUrlParams = this.apiHttpService.setUrlParams({
      wordsPerPage: 3600,
      filter: JSON.stringify({
        $and: [
          { userWord: { $ne: null } },
          {
            'userWord.optional.previous.plannedReviewDate': {
              $lte: dayjs().toISOString(),
            },
          },
        ],
      }),
    });

    const newCards$ = this.apiHttpService
      .get<AggregatedWordsResponse[]>(
        `users/${this.authService.getUserId()}/aggregatedWords`,
        {
          params: newCardsUrlParams,
        }
      )
      .pipe(
        mergeMap((aggregatedWordsResponse) => aggregatedWordsResponse),
        pluck('paginatedResults')
      );

    const cardsForRevision$ = this.apiHttpService
      .get<AggregatedWordsResponse[]>(
        `users/${this.authService.getUserId()}/aggregatedWords`,
        {
          params: cardsForRevisionUrlParams,
        }
      )
      .pipe(
        mergeMap((aggregatedWordsResponse) => aggregatedWordsResponse),
        pluck('paginatedResults'),
        map((aggregatedWords) =>
          aggregatedWords.sort((word1, word2) => {
            if (
              dayjs(
                word1.userWord?.optional.previous.plannedReviewDate
              ).isBefore(word2.userWord?.optional.previous.plannedReviewDate)
            ) {
              return -1;
            } else if (
              dayjs(
                word1.userWord?.optional.previous.plannedReviewDate
              ).isAfter(word2.userWord?.optional.previous.plannedReviewDate)
            ) {
              return 1;
            } else {
              return 0;
            }
          })
        )
      );

    forkJoin([newCards$, cardsForRevision$])
      .pipe(
        switchMap((responses) => responses[1].concat(responses[0])),
        toArray()
      )
      .subscribe((cards) => {
        this.cardsDataService.setCardsCollection(cards);
      });
  }

  setModePosition(cardIndex: number) {
    const translatexValue =
      this.activeModeIndx === cardIndex
        ? '-50%'
        : this.activeModeIndx < cardIndex
        ? `${-50 + (cardIndex - this.activeModeIndx) * 200}%`
        : `${-50 - (this.activeModeIndx - cardIndex) * 200}%`;

    return `translate(${translatexValue}, -50%)`;
  }
}
