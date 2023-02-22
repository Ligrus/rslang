import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as dayjs from 'dayjs';
import { Constants } from 'src/app/config/constants';
import { Observable, switchMap, tap } from 'rxjs';
import { CardsAudioService } from '../services/cards-audio.service';
import { CardsEvaluationService } from '../services/cards-evaluation.service';
import { ApiHttpService } from 'src/app/shared/services/http.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AggregatedWord } from '../interfaces/card.interface';
import { SettingsService } from 'src/app/settings/services/settings.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [CardsAudioService, CardsEvaluationService],
})
export class CardComponent implements OnDestroy {
  @ViewChild('avatar') avatar: ElementRef<HTMLImageElement>;
  @Input() card: AggregatedWord;
  @Output() goToNextCard = new EventEmitter();
  _isCardCompleted: boolean = false;
  endpoint: any;
  response$: Observable<any>;
  isShowAnswerActivated: boolean = false;
  rate: number;
  constructor(
    private http: HttpClient,
    constants: Constants,
    private cardsAudioService: CardsAudioService,
    private cardsEvaluationService: CardsEvaluationService,
    private authService: AuthService,
    private apiHttpService: ApiHttpService,
    private settingsService: SettingsService
  ) {
    this.endpoint = constants['API_ENDPOINT'];
  }

  public set isCardCompleted(value: boolean) {
    this._isCardCompleted = value
    if (this._isCardCompleted) this.playAudio()
  }

  public get isCardCompleted() {
    return this._isCardCompleted
  }

  showAnswer() {
    this.isShowAnswerActivated = true;
  }

  resetCardState() {
    this.isCardCompleted = false
    this.isShowAnswerActivated = false
    this.cardsAudioService.stopCardsAudio()
  }

  rateCardDifficulty = async(rate: number) => {
    const actualReviewDate = dayjs().toISOString();
    const cardEvalResult = this.cardsEvaluationService.evaluate(
      this.card.userWord?.optional?.previous,
      rate,
      actualReviewDate
    );

    const createCard$ = this.apiHttpService.post(`users/${this.authService.getUserId()}/words/${this.card['_id']}`, {
      difficulty: `${rate}`,
      optional: { previous: { ...cardEvalResult } },
    })

    const updateCard$ = this.apiHttpService.put(`users/${this.authService.getUserId()}/words/${this.card['_id']}`, {
      difficulty: `${rate}`,
      optional: { previous: { ...cardEvalResult } },
    })

    const cardSaveAction$ = this.card.userWord ? updateCard$ : createCard$

    cardSaveAction$.pipe(tap(() => {
        this.resetCardState()
        this.goToNextCard.emit()
      }
      ))
      .subscribe();
  }

  playAudio() {
    this.cardsAudioService.playCardAudios(
      `${this.endpoint}${this.card.audioMeaning}`,
      `${this.endpoint}${this.card.audioExample}`
    );
  }

  ngOnDestroy() {
    this.cardsAudioService.stopCardsAudio();
  }
}
