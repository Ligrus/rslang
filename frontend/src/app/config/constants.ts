import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Constants {
  readonly API_ENDPOINT: string = 'http://localhost:3500/';
}
