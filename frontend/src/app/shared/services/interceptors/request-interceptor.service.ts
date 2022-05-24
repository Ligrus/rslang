import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (request.url.includes('tokens')) {
      request = this.addToken(request, this.authService.getRefreshToken());
    }
    else if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (request.url.includes('tokens')) {
            this.authService.logout()
            return throwError(() => error);
          }
          return this.handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      })
    ) as Observable<HttpEvent<any>>;
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private expiredTokenReq: HttpRequest<any>;

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const userId = this.authService.getUserId()

      return this.authService.refreshToken(userId).pipe(
        switchMap((data: any) => {
          this.isRefreshing = false;
          this.expiredTokenReq = request
          this.authService.setTokensToStorage(data.token, data.refreshToken, this.authService.getUserId())
          this.refreshTokenSubject.next(data.token);
          return next.handle(this.addToken(this.expiredTokenReq, data.token));
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
