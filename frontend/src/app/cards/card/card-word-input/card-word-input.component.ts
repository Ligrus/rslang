import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-card-word-input',
  templateUrl: './card-word-input.component.html',
  styleUrls: ['./card-word-input.component.scss'],
})
export class CardWordInputComponent implements OnChanges {
  @Output() isShowAnswerActivatedChange = new EventEmitter();
  @Input() isShowAnswerActivated: boolean;

  @Output() isCardCompletedChange = new EventEmitter();
  @Input() isCardCompleted: boolean;
  // @Output() completeCard = new EventEmitter();
  @Input() wordToCompare: string;
  userWordVariant: string = '';
  wordInputCurrentValue: string = '';
  isWordVariantConfirmed = false;

  constructor(private ref: ChangeDetectorRef) {}

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  resetAnswerShow() {
    this.userWordVariant = '';
    this.isShowAnswerActivatedChange.emit(false);
  }

  showAnswer() {
    this.isShowAnswerActivatedChange.emit(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.['isShowAnswerActivated']?.currentValue) {
      return;
    }
    this.userWordVariant = this.wordInputCurrentValue;
    this.wordInputCurrentValue = '';
    if (
      this.wordToCompare === this.userWordVariant
    ) {
      this.isCardCompletedChange.emit(true)
    }
    setTimeout(() => {

    })

  }
}
