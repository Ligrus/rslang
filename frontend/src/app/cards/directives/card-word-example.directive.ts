import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appCardWordExample]',
  host: {
    '[class.hidden-word]': '!isShowAnswerActivated',
    '[class.learning-word]': 'true',
  },
})
export class CardWordExampleDirective implements OnChanges {
  @Input() appCardWordExample: any;
  @Input() isShowAnswerActivated: any;
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: any) {
    if (changes.appCardWordExample?.currentValue) {
      this.el.nativeElement.insertAdjacentHTML(
        'beforeend',
        `${changes.appCardWordExample.currentValue}`
      );
    }
  }
}
