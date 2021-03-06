import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }
  canActivate() {
      if (!this.authService.getAuthState().value) {
        this.router.navigate(['promo']);
        return false
      }
      return true
  }
}
