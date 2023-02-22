import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiHttpService } from 'src/app/shared/services/http.service';
import { Statistics } from '../interfaces/statistics.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private authService: AuthService, private apiHttpService: ApiHttpService) { }

  initialStatistics: Statistics = {
    learnedWords: 0,
    optional: {
      longestStreak: 0,
      averagePerDay: 0,
      trainingDates: {}
    }
  }

  private statistics = new ReplaySubject(1)

  getCurrentSettings() {
    return this.statistics.asObservable()
  }

  setCurrentSettings(statistics: any) {
    this.statistics.next(statistics)
  }

  fetchSettings() {
    return this.apiHttpService.get<Statistics>(`users/${this.authService.getUserId()}/statistics`)
  }

  updateSettings(statistics: Statistics, userId = this.authService.getUserId()) {
    return this.apiHttpService.put<Statistics>(`users/${userId}/statistics`, statistics)
  }
}
