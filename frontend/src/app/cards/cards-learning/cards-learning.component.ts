import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AggregatedWord } from '../interfaces/card.interface';
import { CardsDataService } from '../services/cards-data.service';

@Component({
  selector: 'app-cards-learning',
  templateUrl: './cards-learning.component.html',
  styleUrls: ['./cards-learning.component.scss'],
})
export class CardsLearningComponent implements OnInit {
  cardsToLearn: AggregatedWord[];
  activeLearnCard: AggregatedWord;
  activeCardIndex: number = 0;
  constructor(
    private router: Router,
    private cardsDataService: CardsDataService,
    private activateRoute: ActivatedRoute
  ) {}

  goToNextCard() {
    this.activeCardIndex += 1
    if (this.activeCardIndex <= this.cardsToLearn.length) {
      this.activeLearnCard = this.cardsToLearn[this.activeCardIndex]
    }

  }

  ngOnInit(): void {
    this.cardsToLearn = this.cardsDataService.getSessionCards();
    if (this.cardsToLearn !== undefined) {
      this.activeLearnCard = this.cardsToLearn[this.activeCardIndex];
    }
    else {
      this.router.navigate(['../'], { relativeTo: this.activateRoute })
    }
  }
}
