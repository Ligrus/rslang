import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiHttpService } from 'src/app/shared/services/http.service';

interface Login {
  email: string,
  password: string
}

interface Register {
  email: string,
  password: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private apiHttpService: ApiHttpService, private router: Router) {
  }

  getAuthState() {
    return this.isAuthenticated
  }

  setAuthState(state: boolean) {
    this.isAuthenticated.next(state)
  }

  setTokensToStorage(token: string, refreshToken: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
  }

  logout() {
    this.setAuthState(false)
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('promo')
  }

  login<T>(creds: Login) {
    return this.apiHttpService.post<T>('signin', creds)
  }

  register(creds: Register) {
    return this.apiHttpService.post('users', creds)
  }

  refreshToken<T>(userId: string) {
    return this.apiHttpService.get<T>(`users/${userId}/tokens`)
  }

  getUserId() {
    return localStorage.getItem('userId') || ''
  }

  getJwtToken() {
    return localStorage.getItem('token') || ''
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken') || ''
  }
}
