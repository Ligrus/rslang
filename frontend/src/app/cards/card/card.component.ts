import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CardsAudioService } from '../services/cards-audio.service';
import { Card } from '../interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [CardsAudioService],
})
export class CardComponent implements OnInit, OnDestroy {
  @ViewChild('avatar') avatar: ElementRef<HTMLImageElement>;
  card: any;
  endpoint: any;
  response$: Observable<any>;
  isShowAnswerActivated: boolean = false;
  constructor(
    private http: HttpClient,
    constants: Constants,
    private cardsAudioService: CardsAudioService
  ) {
    this.endpoint = constants['API_ENDPOINT'];
  }

  showAnswer() {
    this.isShowAnswerActivated = !this.isShowAnswerActivated;
  }

  playAudio() {
    this.cardsAudioService.playCardAudios(
      `${this.endpoint}${this.card.audioMeaning}`,
      `${this.endpoint}${this.card.audioExample}`
    );
  }

  ngOnInit(): void {
    this.http
      .get<Card>(`${this.endpoint}words/5e9f5ee35eb9e72bc21af4a0`)
      .pipe(
        tap((card: Card) => {
          this.card = card;
          this.avatar.nativeElement.src = `${this.endpoint}${this.card.image}`;
          console.log(this.card);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.cardsAudioService.stopCardsAudio();
  }
}
