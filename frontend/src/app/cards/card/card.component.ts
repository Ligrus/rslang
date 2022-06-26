import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild('avatar') avatar: ElementRef<HTMLImageElement>;
  card: any;
  endpoint: any;
  response$: Observable<any>;
  isShowAnswerActivated: boolean = false;
  constructor(private http: HttpClient, constants: Constants) {
    this.endpoint = constants['API_ENDPOINT'];
  }

  showAnswer() {
    this.isShowAnswerActivated = !this.isShowAnswerActivated;
  }

  ngOnInit(): void {
    this.http
      .get(`${this.endpoint}words/5e9f5ee35eb9e72bc21af4a0`)
      .pipe(
        tap((card) => {
          this.card = card;
          this.avatar.nativeElement.src = `${this.endpoint}${this.card.image}`;
          console.log(this.card);
        })
      )
      .subscribe();
  }
}
