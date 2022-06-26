import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-word-input',
  templateUrl: './card-word-input.component.html',
  styleUrls: ['./card-word-input.component.scss'],
})
export class CardWordInputComponent {
  @Input() wordToCompare: string;
  @ViewChild('wordInput') wordInput: ElementRef<HTMLInputElement>;
  userWordVariant: string = '';
  wordInputCurrentValue: string = '';
  isWordVariantConfirmed = false;

  constructor() {}

  toggleUserWordCheck(isWordVariantConfirmed: boolean) {
    if (this.isWordVariantConfirmed !== isWordVariantConfirmed) {
      this.isWordVariantConfirmed = isWordVariantConfirmed;
      if (this.isWordVariantConfirmed) {
        this.userWordVariant = this.wordInputCurrentValue;
        this.wordInputCurrentValue = '';
        return;
      }
      this.userWordVariant = '';
    }
  }
}
