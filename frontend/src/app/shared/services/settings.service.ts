import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private userId = new BehaviorSubject<string>('');

  constructor() {
  }

  getUser() {
    return this.userId
  }

  setUser(state: string) {
    this.userId.next(state)
  }

}
