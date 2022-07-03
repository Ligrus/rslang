import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-card-word-input',
  templateUrl: './card-word-input.component.html',
  styleUrls: ['./card-word-input.component.scss'],
})
export class CardWordInputComponent implements OnChanges {
  @Output() isShowAnswerActivatedChange = new EventEmitter();
  @Output() completeCard = new EventEmitter();
  @Input() isShowAnswerActivated: boolean;
  @Input() wordToCompare: string;
  userWordVariant: string = '';
  wordInputCurrentValue: string = '';
  isWordVariantConfirmed = false;
  isCardCompleted = false;

  constructor() {}

  resetAnswerShow() {
    this.userWordVariant = '';
    this.isShowAnswerActivatedChange.emit(false);
  }

  showAnswer() {
    this.isShowAnswerActivatedChange.emit(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['isShowAnswerActivated'].currentValue) {
      return;
    }
    this.userWordVariant = this.wordInputCurrentValue;
    this.wordInputCurrentValue = '';
    if (this.userWordVariant.toLowerCase().includes(this.wordToCompare)) {
      this.completeCard.emit();
      this.isCardCompleted = true;
    }
  }
}
