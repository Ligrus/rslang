import { Injectable } from '@angular/core';
import { AggregatedWord } from '../interfaces/card.interface';

@Injectable()
export class CardsDataService {
  private allCards: AggregatedWord[];
  private sessionCards: AggregatedWord[];
  constructor() {}

  getSessionCards() {
    return this.sessionCards;
  }

  setCardsCollection(cards: AggregatedWord[]) {
    this.allCards = cards;
    this.setAllSessionCards();
  }

  setAllSessionCards() {
    this.sessionCards = this.allCards;
  }

  setOnlyNewCards() {
    this.sessionCards = this.sessionCards.filter((card) => !card.userWord);
  }

  setOnlyCardsForRevision() {
    this.sessionCards = this.sessionCards.filter((card) => card.userWord);
  }
}
