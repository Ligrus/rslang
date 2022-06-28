import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-word-input',
  templateUrl: './card-word-input.component.html',
  styleUrls: ['./card-word-input.component.scss'],
})
export class CardWordInputComponent {
  @Input() wordToCompare: string;
  userWordVariant: string = '';
  wordInputCurrentValue: string = '';
  isWordVariantConfirmed = false;

  constructor() {}

  toggleUserWordCheckLaunch(isWordVariantConfirmed: boolean) {
    if (this.isWordVariantConfirmed === isWordVariantConfirmed) {
      return;
    }
    this.isWordVariantConfirmed = isWordVariantConfirmed;

    if (!this.isWordVariantConfirmed) {
      this.userWordVariant = '';
      return;
    }
    this.userWordVariant = this.wordInputCurrentValue;
    this.wordInputCurrentValue = '';
  }
}
