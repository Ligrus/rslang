import { Injectable } from '@angular/core';

@Injectable()
export class CardsAudioService {
  audio;

  constructor() {
    this.audio = new Audio();
  }

  playCardAudios(textMeaningSrc: string, textExampleSrc: string) {
    this.audio.src = textExampleSrc;
    this.audio.play();

    const handleAudioMeaning = () => {
      this.audio.src = textMeaningSrc;
      this.audio.play();
      this.audio.removeEventListener('ended', handleAudioMeaning);
    };
    this.audio.addEventListener('ended', handleAudioMeaning);
  }

  stopCardsAudio() {
    this.audio.srcObject = null;
  }
}
