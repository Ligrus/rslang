import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, share, shareReplay, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiHttpService } from 'src/app/shared/services/http.service';
import { Settings } from '../interfaces/settings.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private authService: AuthService, private apiHttpService: ApiHttpService) { }

  defaultSettings = {
    optional: {
      showWordTranslation: true,
      showWordExplanation: true,
      showWordExample: true,
      showWordTranscription: true,
      showImage: true,
      playSound: true,
      isDeleteWordEnabled: true,
      isShowAnswerEnabled: true,
      isAddToHardWordsEnabled: true,
      newWordsAmount: 10,
      wordsPerDay: 20,
    }
  }

  private settings = new ReplaySubject(1)

  getCurrentSettings() {
    return this.settings.asObservable()
  }

  setCurrentSettings(settings: any) {
    this.settings.next(settings)
  }

  setDefaultSettings() {
    this.settings.next(this.defaultSettings)
  }

  fetchSettings() {
    return this.apiHttpService.get<Settings>(`users/${this.authService.getUserId()}/settings`)
  }

  updateSettings(settings: Settings, userId = this.authService.getUserId()) {
    return this.apiHttpService.put<Settings>(`users/${userId}/settings`, settings)
  }

}
